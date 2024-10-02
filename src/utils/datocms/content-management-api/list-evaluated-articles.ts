import { createCMAClient } from "./create-cma-client";

export const listEvaluatedArticles = async () => {
  const client = createCMAClient();

  const articles = await client.items.list({
    filter: {
      type: "evaluated_article",
    },
    order_by: "published_datetime_DESC",
    page: {
      limit: 500,
    },
  });

  return articles;
};
