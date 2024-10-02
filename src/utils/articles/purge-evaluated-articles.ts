import {
  deleteEvaluatedArticles,
  listEvaluatedArticles,
} from "../datocms/content-management-api";

export const purgeEvaluatedArticles = async ({ maxArticlesStored = 30 }) => {
  /** Fetch all EvaluatedArticles from DatoCMS **/
  const articles = await listEvaluatedArticles();

  /** Delete old EvaluatedArticles in DatoCMS **/
  const totals = articles.length;
  if (totals > maxArticlesStored) {
    const overflow = totals - maxArticlesStored;
    const oldArticleIds = articles.slice(-overflow).map((a) => a.id);
    await deleteEvaluatedArticles(oldArticleIds);
  }
};
