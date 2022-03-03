import { ServerResponse, IncomingMessage } from "http"
import hkdf from "@panva/hkdf"
import { EncryptJWT, jwtDecrypt } from "jose"
import { nanoid } from "nanoid"
import Cookie from "cookie"
import { config } from "./config"
import { singletonAsync } from "./singleton"
import { verifyJWT } from "./jwt"
import { prisma } from "./prisma"

export type Viewer = {
  id: string
  name: string
  email: string
  role: string
}

export const getDerivedKey = (secret: string) =>
  hkdf("sha256", secret, "", "Generated Encryption Key", 32)

export const AUTH_ENCRYPTION_KEY = singletonAsync("auth_encryption_key", () =>
  getDerivedKey(config.AUTH_SECRET)
)

export const encrypt = async (payload: any, exp: string) => {
  await AUTH_ENCRYPTION_KEY.wait
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .setJti(nanoid())
    .encrypt(AUTH_ENCRYPTION_KEY.value)
}

export const decrypt = async (token: string) => {
  await AUTH_ENCRYPTION_KEY.wait
  const { payload } = await jwtDecrypt(token, AUTH_ENCRYPTION_KEY.value, {
    clockTolerance: 15,
  })
  return payload
}

export const setAuthCookie = (res: ServerResponse, token: string) => {
  const value = Cookie.serialize(config.AUTH_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
  })
  res.setHeader("set-cookie", value)
}

export const getAuthUser = async (
  req: IncomingMessage
): Promise<Viewer | null> => {
  const token =
    req.headers["authorization"]?.replace("Bearer ", "") ||
    Cookie.parse(req.headers.cookie || "")[config.AUTH_COOKIE_NAME]

  if (token) {
    const { userId } = await verifyJWT(token)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) return null
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
  return null
}
