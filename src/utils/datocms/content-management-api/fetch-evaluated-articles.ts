import { createCMAClient } from "./create-cma-client";

export const fetchEvaluatedArticles = async () => {
  const client = createCMAClient();

  // list method returns 30 items by default
  const items = await client.items.list({
    filter: { type: import.meta.env.DATOCMS_ARTICLE_ITEM_TYPE_ID },
  });

  return items;
};
