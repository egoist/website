import { ArgsType, registerEnumType, Field } from "type-graphql"
import * as isoDate from "graphql-iso-date"

export enum Order {
  desc = "desc",
  asc = "asc",
}

registerEnumType(Order, {
  name: "Order",
})

export const GraphQLDateTime = isoDate.GraphQLDateTime

@ArgsType()
export class DateFormattedArgs {
  @Field()
  field: string

  @Field()
  format: string
}
