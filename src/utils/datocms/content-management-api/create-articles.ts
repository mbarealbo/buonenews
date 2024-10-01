import type { EvaluatedArticleFragment } from "@/codegen/graphql";
import { createCMAClient } from "./create-cma-client";

export const createArticles = async (
  evaluatedArticles: EvaluatedArticleFragment[],
) => {
  const client = createCMAClient();

  const promises = evaluatedArticles.map(async () => {
    const item = await client.items.create({
      item_type: {
        type: "item_type",
        id: import.meta.env.DATOCMS_ARTICLE_ITEM_TYPE_ID,
      },
    });

    return item;
  });

  await Promise.all(promises);
};
