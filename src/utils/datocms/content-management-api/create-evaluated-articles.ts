import { createCMAClient } from "./create-cma-client";

export type EvaluatedArticle = {
  publication: string;
  title: string;
  description: string;
  link: string;
  published_datetime: number;
  ai_sentiment: string;
  ai_comment: string;
};

export const createEvaluatedArticles = async (
  evaluatedArticles: EvaluatedArticle[],
) => {
  const client = createCMAClient();

  const promises = evaluatedArticles.map(async (article) => {
    const item = await client.items.create({
      item_type: {
        type: "item_type",
        id: import.meta.env.DATOCMS_ARTICLE_ITEM_TYPE_ID,
      },
      publication: article.publication,
      title: article.title,
      description: article.description,
      link: article.link,
      published_datetime: article.published_datetime,
      ai_sentiment: article.ai_sentiment,
      ai_comment: article.ai_comment,
    });

    return item;
  });

  await Promise.all(promises);
};
