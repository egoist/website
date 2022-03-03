import { DocumentNode } from 'graphql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPage: Page;
  login: Scalars['Boolean'];
  signup: Scalars['Boolean'];
  updatePage: Page;
};


export type MutationCreatePageArgs = {
  content: Scalars['String'];
  published?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdatePageArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  published?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type Page = {
  __typename?: 'Page';
  content: Scalars['String'];
  contentHTML: Scalars['String'];
  createdAt: Scalars['DateTime'];
  dateFormatted: Scalars['String'];
  id: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};


export type PageDateFormattedArgs = {
  field: Scalars['String'];
  format: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPage: Page;
  getPages: Array<Page>;
  sayHello: Scalars['String'];
};


export type QueryGetPageArgs = {
  slugOrId: Scalars['String'];
};


export type QueryGetPagesArgs = {
  includeDrafts?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Order>;
  type: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  slug: Scalars['String'];
  published?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPage: { __typename?: 'Page', id: string } };

export type GetPageQueryVariables = Exact<{
  slugOrId: Scalars['String'];
}>;


export type GetPageQuery = { __typename?: 'Query', getPage: { __typename?: 'Page', id: string, title: string, slug: string, type: string, contentHTML: string, createdAt: string } };

export type GetPageForEditQueryVariables = Exact<{
  slugOrId: Scalars['String'];
}>;


export type GetPageForEditQuery = { __typename?: 'Query', getPage: { __typename?: 'Page', id: string, title: string, slug: string, content: string, published?: boolean | null | undefined, publishedAt?: any | null | undefined } };

export type GetPagesQueryVariables = Exact<{
  type: Scalars['String'];
  includeDrafts?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Order>;
}>;


export type GetPagesQuery = { __typename?: 'Query', getPages: Array<{ __typename?: 'Page', id: string, slug: string, title: string, contentHTML: string }> };

export type GetPostsForFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsForFeedQuery = { __typename?: 'Query', getPages: Array<{ __typename?: 'Page', id: string, title: string, slug: string, publishedAt?: any | null | undefined, contentHTML: string }> };

export type GetPostsForListingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsForListingQuery = { __typename?: 'Query', getPages: Array<{ __typename?: 'Page', id: string, title: string, slug: string, publishedAt: string }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type UpdatePageMutationVariables = Exact<{
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePageMutation = { __typename?: 'Mutation', updatePage: { __typename?: 'Page', id: string } };


export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"published"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publishedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"post","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"published"},"value":{"kind":"Variable","name":{"kind":"Name","value":"published"}}},{"kind":"Argument","name":{"kind":"Name","value":"publishedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publishedAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const GetPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slugOrId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slugOrId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slugOrId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"contentHTML"}},{"kind":"Field","alias":{"kind":"Name","value":"createdAt"},"name":{"kind":"Name","value":"dateFormatted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"StringValue","value":"YYYY-MM-DD","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"field"},"value":{"kind":"StringValue","value":"createdAt","block":false}}]}]}}]}}]} as unknown as DocumentNode;

export function useGetPageQuery(options: Omit<Urql.UseQueryArgs<GetPageQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPageQuery>({ query: GetPageDocument, ...options });
};
export const GetPageForEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPageForEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slugOrId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slugOrId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slugOrId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}}]}}]}}]} as unknown as DocumentNode;

export function useGetPageForEditQuery(options: Omit<Urql.UseQueryArgs<GetPageForEditQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPageForEditQuery>({ query: GetPageForEditDocument, ...options });
};
export const GetPagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeDrafts"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"includeDrafts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeDrafts"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentHTML"}}]}}]}}]} as unknown as DocumentNode;

export function useGetPagesQuery(options: Omit<Urql.UseQueryArgs<GetPagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPagesQuery>({ query: GetPagesDocument, ...options });
};
export const GetPostsForFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostsForFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"post","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"contentHTML"}}]}}]}}]} as unknown as DocumentNode;

export function useGetPostsForFeedQuery(options: Omit<Urql.UseQueryArgs<GetPostsForFeedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsForFeedQuery>({ query: GetPostsForFeedDocument, ...options });
};
export const GetPostsForListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostsForListing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"post","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","alias":{"kind":"Name","value":"publishedAt"},"name":{"kind":"Name","value":"dateFormatted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"StringValue","value":"YYYY-MM-DD","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"field"},"value":{"kind":"StringValue","value":"publishedAt","block":false}}]}]}}]}}]} as unknown as DocumentNode;

export function useGetPostsForListingQuery(options: Omit<Urql.UseQueryArgs<GetPostsForListingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsForListingQuery>({ query: GetPostsForListingDocument, ...options });
};
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const UpdatePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"published"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publishedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"published"},"value":{"kind":"Variable","name":{"kind":"Name","value":"published"}}},{"kind":"Argument","name":{"kind":"Name","value":"publishedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publishedAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;

export function useUpdatePageMutation() {
  return Urql.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument);
};