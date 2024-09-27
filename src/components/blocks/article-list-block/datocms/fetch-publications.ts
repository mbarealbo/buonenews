import {
  PublicationDocument,
  type PublicationFragment,
} from "@/codegen/graphql";
import { createGraphQLClient } from "@/utils";

export const fetchPublications = async (): Promise<PublicationFragment[]> => {
  const client = createGraphQLClient();
  const query = await client.request(PublicationDocument);
  return query.allPublications.filter((publication) => publication.enabled);
};
