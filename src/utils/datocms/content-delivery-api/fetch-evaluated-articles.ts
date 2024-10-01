import {
  AllEvaluatedArticlesDocument,
  type EvaluatedArticleFragment,
} from "@/codegen/graphql";
import { createCDAClient } from "./create-cda-client";

export const fetchEvaluatedArticles = async (): Promise<
  EvaluatedArticleFragment[]
> => {
  const client = createCDAClient();
  const query = await client.request(AllEvaluatedArticlesDocument, {});
  return query.allEvaluatedArticles;
};
