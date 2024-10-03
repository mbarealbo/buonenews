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
    "query AllEvaluatedArticles($sentiment: String) {\n  allEvaluatedArticles(\n    filter: {aiSentiment: {eq: $sentiment}}\n    orderBy: [publishedDatetime_DESC]\n  ) {\n    ...EvaluatedArticle\n  }\n}\n\nfragment EvaluatedArticle on EvaluatedArticleRecord {\n  id\n  title\n  description\n  link\n  publishedDatetime\n  publication {\n    id\n    organization\n  }\n  aiSentiment\n  aiComment\n}\n\nfragment ArticleListBlock on ArticleListBlockRecord {\n  id\n}": types.AllEvaluatedArticlesDocument,
    "fragment PublicationLogoBlock on PublicationLogoBlockRecord {\n  id\n}": types.PublicationLogoBlockFragmentDoc,
    "query Page {\n  allPages {\n    ...Page\n  }\n}\n\nquery Publication {\n  allPublications {\n    ...Publication\n  }\n}\n\nquery Prompt {\n  prompt {\n    ...Prompt\n  }\n}\n\nquery Site {\n  _site {\n    globalSeo {\n      siteName\n      titleSuffix\n      fallbackSeo {\n        title\n        description\n      }\n    }\n  }\n}\n\nfragment Page on PageRecord {\n  navigationLabel\n  slug\n  showHeader\n  showFooter\n  content {\n    value\n    blocks {\n      __typename\n      ...ArticleListBlock\n      ...PublicationLogoBlock\n    }\n  }\n  seo {\n    title\n    description\n  }\n}\n\nfragment Publication on PublicationRecord {\n  id\n  organization\n  rssLink\n  enabled\n  logo {\n    responsiveImage(imgixParams: {auto: format, h: 33}) {\n      ...ResponsiveImage\n    }\n  }\n}\n\nfragment Prompt on PromptRecord {\n  system\n  user\n}\n\nfragment ResponsiveImage on ResponsiveImage {\n  srcSet\n  webpSrcSet\n  sizes\n  src\n  width\n  height\n  aspectRatio\n  alt\n  title\n  base64\n}": types.PageDocument,
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
export function graphql(source: "query AllEvaluatedArticles($sentiment: String) {\n  allEvaluatedArticles(\n    filter: {aiSentiment: {eq: $sentiment}}\n    orderBy: [publishedDatetime_DESC]\n  ) {\n    ...EvaluatedArticle\n  }\n}\n\nfragment EvaluatedArticle on EvaluatedArticleRecord {\n  id\n  title\n  description\n  link\n  publishedDatetime\n  publication {\n    id\n    organization\n  }\n  aiSentiment\n  aiComment\n}\n\nfragment ArticleListBlock on ArticleListBlockRecord {\n  id\n}"): (typeof documents)["query AllEvaluatedArticles($sentiment: String) {\n  allEvaluatedArticles(\n    filter: {aiSentiment: {eq: $sentiment}}\n    orderBy: [publishedDatetime_DESC]\n  ) {\n    ...EvaluatedArticle\n  }\n}\n\nfragment EvaluatedArticle on EvaluatedArticleRecord {\n  id\n  title\n  description\n  link\n  publishedDatetime\n  publication {\n    id\n    organization\n  }\n  aiSentiment\n  aiComment\n}\n\nfragment ArticleListBlock on ArticleListBlockRecord {\n  id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PublicationLogoBlock on PublicationLogoBlockRecord {\n  id\n}"): (typeof documents)["fragment PublicationLogoBlock on PublicationLogoBlockRecord {\n  id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page {\n  allPages {\n    ...Page\n  }\n}\n\nquery Publication {\n  allPublications {\n    ...Publication\n  }\n}\n\nquery Prompt {\n  prompt {\n    ...Prompt\n  }\n}\n\nquery Site {\n  _site {\n    globalSeo {\n      siteName\n      titleSuffix\n      fallbackSeo {\n        title\n        description\n      }\n    }\n  }\n}\n\nfragment Page on PageRecord {\n  navigationLabel\n  slug\n  showHeader\n  showFooter\n  content {\n    value\n    blocks {\n      __typename\n      ...ArticleListBlock\n      ...PublicationLogoBlock\n    }\n  }\n  seo {\n    title\n    description\n  }\n}\n\nfragment Publication on PublicationRecord {\n  id\n  organization\n  rssLink\n  enabled\n  logo {\n    responsiveImage(imgixParams: {auto: format, h: 33}) {\n      ...ResponsiveImage\n    }\n  }\n}\n\nfragment Prompt on PromptRecord {\n  system\n  user\n}\n\nfragment ResponsiveImage on ResponsiveImage {\n  srcSet\n  webpSrcSet\n  sizes\n  src\n  width\n  height\n  aspectRatio\n  alt\n  title\n  base64\n}"): (typeof documents)["query Page {\n  allPages {\n    ...Page\n  }\n}\n\nquery Publication {\n  allPublications {\n    ...Publication\n  }\n}\n\nquery Prompt {\n  prompt {\n    ...Prompt\n  }\n}\n\nquery Site {\n  _site {\n    globalSeo {\n      siteName\n      titleSuffix\n      fallbackSeo {\n        title\n        description\n      }\n    }\n  }\n}\n\nfragment Page on PageRecord {\n  navigationLabel\n  slug\n  showHeader\n  showFooter\n  content {\n    value\n    blocks {\n      __typename\n      ...ArticleListBlock\n      ...PublicationLogoBlock\n    }\n  }\n  seo {\n    title\n    description\n  }\n}\n\nfragment Publication on PublicationRecord {\n  id\n  organization\n  rssLink\n  enabled\n  logo {\n    responsiveImage(imgixParams: {auto: format, h: 33}) {\n      ...ResponsiveImage\n    }\n  }\n}\n\nfragment Prompt on PromptRecord {\n  system\n  user\n}\n\nfragment ResponsiveImage on ResponsiveImage {\n  srcSet\n  webpSrcSet\n  sizes\n  src\n  width\n  height\n  aspectRatio\n  alt\n  title\n  base64\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;