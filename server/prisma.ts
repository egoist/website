import { PrismaClient } from "@prisma/client"
import { singleton } from "./singleton"

export const prisma = singleton("prisma", () => {
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "info", "query", "warn"]
        : undefined,
  })

  return client
})
