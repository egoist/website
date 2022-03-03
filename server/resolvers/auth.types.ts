import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class SignupArgs {
  @Field()
  email: string

  @Field()
  password: string
}

@ArgsType()
export class LoginArgs {
  @Field()
  email: string

  @Field()
  password: string
}
