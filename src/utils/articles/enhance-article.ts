import type { EvaluatedArticleFragment } from "@/codegen/graphql";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export const enhanceArticle = (article: EvaluatedArticleFragment) => {
  const formatStr = "d MMMM yyyy, HH:mm";

  return {
    ...article,
    formattedDatetime: format(article.publishedDatetime, formatStr, {
      locale: it,
    }),
  };
};
