import { Args, Mutation, Query, Resolver } from "type-graphql"
import { prisma } from "~/server/prisma"
import { hash, verify } from "@node-rs/argon2"
import { ApolloError } from "apollo-server-core"
import { LoginArgs, SignupArgs } from "./auth.types"
import { setAuthCookie } from "../auth"
import { getJWT } from "../jwt"
import { type Context, GqlContext } from "../decorators"

@Resolver()
export default class AuthResolver {
  @Query((returns) => String)
  sayHello() {
    return "hello"
  }

  @Mutation((returns) => Boolean)
  async signup(@GqlContext() ctx: Context, @Args() args: SignupArgs) {
    const password = await hash(args.password)
    const existing = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    })

    if (existing) {
      throw new ApolloError("Email already in use")
    }

    const prevUser = await prisma.user.findFirst()

    const user = await prisma.user.create({
      data: {
        name: args.email.split("@")[0],
        email: args.email,
        password,
        // Make it an admin if this is the first user
        role: prevUser ? "reader" : "admin",
      },
    })

    setAuthCookie(ctx.res, await getJWT({ userId: user.id }))

    return true
  }

  @Mutation((returns) => Boolean)
  async login(@GqlContext() ctx: Context, @Args() args: LoginArgs) {
    const user = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    })

    if (!user) {
      throw new ApolloError("Account not found")
    }

    const valid = await verify(user.password, args.password)

    if (!valid) {
      throw new ApolloError("Invalid password")
    }

    setAuthCookie(ctx.res, await getJWT({ userId: user.id }))

    return true
  }
}
