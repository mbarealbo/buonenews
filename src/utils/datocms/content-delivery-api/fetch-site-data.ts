import { SiteDocument } from "@/codegen/graphql";
import { createCDAClient } from "./create-cda-client";

export const fetchSiteData = async () => {
  const client = createCDAClient();
  const query = await client.request(SiteDocument);
  return query._site;
};
