import { GraphQLClient } from "graphql-request";

export const createGraphQLClient = () => {
  if (!process.env.DATOCMS_API_URL) {
    throw new Error("DATOCMS_API_URL is not set");
  }

  return new GraphQLClient(process.env.DATOCMS_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
};
