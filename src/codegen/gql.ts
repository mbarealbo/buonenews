/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Page {\n  allPages {\n    ...Page\n  }\n}\n\nquery Publication {\n  allPublications {\n    ...Publication\n  }\n}\n\nquery Prompt {\n  prompt {\n    ...Prompt\n  }\n}\n\nquery Site {\n  _site {\n    globalSeo {\n      siteName\n      titleSuffix\n      fallbackSeo {\n        title\n        description\n      }\n    }\n  }\n}\n\nfragment Page on PageRecord {\n  navigationLabel\n  slug\n  hidden\n  content {\n    value\n    blocks {\n      __typename\n      ...ArticleListBlock\n    }\n  }\n  seo {\n    title\n    description\n  }\n}\n\nfragment Publication on PublicationRecord {\n  __typename\n  id\n  organization\n  rssLink\n  enabled\n}\n\nfragment Prompt on PromptRecord {\n  __typename\n  system\n  user\n}\n\nfragment ArticleListBlock on ArticleListBlockRecord {\n  __typename\n  id\n}": types.PageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page {\n  allPages {\n    ...Page\n  }\n}\n\nquery Publication {\n  allPublications {\n    ...Publication\n  }\n}\n\nquery Prompt {\n  prompt {\n    ...Prompt\n  }\n}\n\nquery Site {\n  _site {\n    globalSeo {\n      siteName\n      titleSuffix\n      fallbackSeo {\n        title\n        description\n      }\n    }\n  }\n}\n\nfragment Page on PageRecord {\n  navigationLabel\n  slug\n  hidden\n  content {\n    value\n    blocks {\n      __typename\n      ...ArticleListBlock\n    }\n  }\n  seo {\n    title\n    description\n  }\n}\n\nfragment Publication on PublicationRecord {\n  __typename\n  id\n  organization\n  rssLink\n  enabled\n}\n\nfragment Prompt on PromptRecord {\n  __typename\n  system\n  user\n}\n\nfragment ArticleListBlock on ArticleListBlockRecord {\n  __typename\n  id\n}"): (typeof documents)["query Page {\n  allPages {\n    ...Page\n  }\n}\n\nquery Publication {\n  allPublications {\n    ...Publication\n  }\n}\n\nquery Prompt {\n  prompt {\n    ...Prompt\n  }\n}\n\nquery Site {\n  _site {\n    globalSeo {\n      siteName\n      titleSuffix\n      fallbackSeo {\n        title\n        description\n      }\n    }\n  }\n}\n\nfragment Page on PageRecord {\n  navigationLabel\n  slug\n  hidden\n  content {\n    value\n    blocks {\n      __typename\n      ...ArticleListBlock\n    }\n  }\n  seo {\n    title\n    description\n  }\n}\n\nfragment Publication on PublicationRecord {\n  __typename\n  id\n  organization\n  rssLink\n  enabled\n}\n\nfragment Prompt on PromptRecord {\n  __typename\n  system\n  user\n}\n\nfragment ArticleListBlock on ArticleListBlockRecord {\n  __typename\n  id\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;