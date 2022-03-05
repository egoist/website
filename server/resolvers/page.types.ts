import { ArgsType, Field, ObjectType } from "type-graphql"
import { GraphQLDateTime, Order } from "./shared.types"

@ArgsType()
export class CreatePageArgs {
  @Field()
  type: string

  @Field()
  title: string

  @Field()
  content: string

  @Field((type) => String, { nullable: true })
  slug?: string

  @Field({ nullable: true })
  published?: boolean

  @Field({ nullable: true })
  publishedAt?: string

  @Field({ nullable: true })
  language?: string
}

@ArgsType()
export class UpdatePageArgs {
  @Field()
  id: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  content?: string

  @Field((type) => String, { nullable: true })
  slug?: string

  @Field({ nullable: true })
  published?: boolean

  @Field({ nullable: true })
  publishedAt?: string

  @Field({ nullable: true })
  language?: string
}

@ObjectType({ simpleResolvers: true })
export class Page {
  @Field()
  id: string

  @Field()
  type: string

  @Field()
  title: string

  @Field()
  content: string

  @Field()
  slug: string

  @Field((type) => GraphQLDateTime)
  createdAt: Date

  @Field({ nullable: true })
  published?: boolean

  @Field((type) => GraphQLDateTime, { nullable: true })
  publishedAt?: Date

  @Field({ nullable: true })
  language?: string
}

@ArgsType()
export class GetPagesArgs {
  @Field()
  type: string

  @Field({ nullable: true })
  includeDrafts?: boolean

  @Field((type) => Order, { nullable: true, defaultValue: Order.desc })
  order: Order

  @Field({ nullable: true })
  language?: string
}

@ArgsType()
export class GetPageArgs {
  @Field()
  slugOrId: string
}
