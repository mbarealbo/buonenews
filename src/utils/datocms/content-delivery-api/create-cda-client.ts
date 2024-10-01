import { GraphQLClient } from "graphql-request";

export const createCDAClient = () => {
  const client = new GraphQLClient(import.meta.env.DATOCMS_API_URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
    },
  });

  return client;
};
