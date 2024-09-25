import { PublicationDocument } from "../codegen/graphql.js";
import { createGraphQLClient } from "./graphql-client.js";

export const fetchPublications = async () => {
  const client = createGraphQLClient();
  const query = await client.request(PublicationDocument);
  // return query.allPublications.filter((publication) => publication.enabled);
};
