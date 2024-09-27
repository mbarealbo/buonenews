import {
  PageDocument,
  type PageFragment,
  SiteDocument,
} from "@/codegen/graphql";
import { createGraphQLClient } from "@/utils";

export const fetchPages = async (): Promise<PageFragment[]> => {
  const client = createGraphQLClient();
  const query = await client.request(PageDocument);
  return query.allPages;
};

export const fetchSiteData = async () => {
  const client = createGraphQLClient();
  const query = await client.request(SiteDocument);
  return query._site;
};
