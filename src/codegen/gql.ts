/* eslint-disable */
import * as types from './graphql';



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
    "query Publication {\n  allPublications {\n    organization\n    rssLink\n    enabled\n  }\n}\n\nquery Page($slug: String!) {\n  page(filter: {slug: {eq: $slug}}) {\n    id\n    slug\n    title\n  }\n}": types.PublicationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Publication {\n  allPublications {\n    organization\n    rssLink\n    enabled\n  }\n}\n\nquery Page($slug: String!) {\n  page(filter: {slug: {eq: $slug}}) {\n    id\n    slug\n    title\n  }\n}"): typeof import('./graphql').PublicationDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
