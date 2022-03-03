import { decrypt, encrypt } from "./auth"

type AUTH_COOKIE_PAYLOAD = {
  userId: string
}

export function getJWT(payload: AUTH_COOKIE_PAYLOAD) {
  return encrypt(payload, "30d")
}

export function verifyJWT(token: string): Promise<AUTH_COOKIE_PAYLOAD> {
  return decrypt(token) as any
}
