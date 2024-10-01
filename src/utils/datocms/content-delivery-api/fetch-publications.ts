import {
  PublicationDocument,
  type PublicationFragment,
} from "@/codegen/graphql";
import { createCDAClient } from "./create-cda-client";

export const fetchPublications = async (): Promise<PublicationFragment[]> => {
  const client = createCDAClient();
  const query = await client.request(PublicationDocument);
  return query.allPublications.filter((pub) => pub.enabled);
};
