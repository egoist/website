import { hash } from "@node-rs/argon2"
import { PrismaClient } from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()

  await prisma.user.deleteMany()
  await prisma.user.create({
    data: {
      role: "admin",
      name: "John Doe",
      email: "test@test.com",
      password: await hash("password"),
    },
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
