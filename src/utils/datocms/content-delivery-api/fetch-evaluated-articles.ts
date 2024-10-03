import {
  AllEvaluatedArticlesDocument,
  type EvaluatedArticleFragment,
} from "@/codegen/graphql";
import type { Sentiment } from "@/utils/openai/types";
import { createCDAClient } from "./create-cda-client";

export const fetchEvaluatedArticles = async (
  sentiment: Sentiment | null,
): Promise<EvaluatedArticleFragment[]> => {
  const client = createCDAClient();

  const query = await client.request(AllEvaluatedArticlesDocument, {
    sentiment,
  });

  return query.allEvaluatedArticles;
};
