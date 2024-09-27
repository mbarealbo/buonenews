import { PageSlugDocument } from "@/codegen/graphql";
import { createGraphQLClient } from "@/utils";

export const fetchPageSlugs = async () => {
  const client = createGraphQLClient();
  const query = await client.request(PageSlugDocument);
  return query.allPages.map((page) => page.slug);
};
