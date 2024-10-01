import { PageDocument, type PageFragment } from "@/codegen/graphql";
import { createCDAClient } from "./create-cda-client";

export const fetchPages = async (): Promise<PageFragment[]> => {
  const client = createCDAClient();
  const query = await client.request(PageDocument);
  return query.allPages;
};
