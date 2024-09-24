import { GraphQLClient } from "graphql-request";

export const createGraphQLClient = () => {
  if (!import.meta.env.DATOCMS_API_URL) {
    throw new Error("DATOCMS_API_URL is not set");
  }

  return new GraphQLClient(import.meta.env.DATOCMS_API_URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
    },
  });
};
