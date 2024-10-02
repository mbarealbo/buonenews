import { fetchPublications } from "../datocms/content-delivery-api";
import {
  type EvaluatedArticle,
  createEvaluatedArticles,
  listEvaluatedArticles,
} from "../datocms/content-management-api";
import { evaluateXmlArticles } from "../openai";
import { extractXmlArticles } from "./extract-xml-articles";

export const syncEvaluatedArticles = async ({
  maxArticlesPerPublication = 10,
}) => {
  /** Fetch all XML Articles from RSS Feeds */
  const pubs = await fetchPublications();
  const pubsMapping = Object.fromEntries(pubs.map((p) => [p.organization, p]));
  const xmlArticles = await extractXmlArticles(pubs, maxArticlesPerPublication);

  /** Fetch all EvaluatedArticles from DatoCMS **/
  const articles = await listEvaluatedArticles();

  /** Filter out XML Articles that are already evaluated **/
  const articleMapping = Object.fromEntries(articles.map((a) => [a.title, a]));
  const newXmlArticles = xmlArticles.filter((a) => !articleMapping[a.title]);

  // console.log(`old articles: ${articles.map((a) => a.title)}`);
  // console.log(`new articles: ${newXmlArticles.map((a) => a.title)}`);

  /** Evaluate new XML Articles with OpenAI **/
  const evaluatedMapping = await evaluateXmlArticles(newXmlArticles);

  /** Create new EvaluatedArticles in DatoCMS **/
  if (newXmlArticles.length > 0) {
    const newArticles: EvaluatedArticle[] = newXmlArticles.map(
      (xmlArticle) => ({
        publication: pubsMapping[xmlArticle.organization].id,
        title: xmlArticle.title,
        description: xmlArticle.description,
        link: xmlArticle.link,
        published_datetime: xmlArticle.pubDate,
        ai_sentiment: evaluatedMapping[xmlArticle.title].sentiment,
        ai_comment: evaluatedMapping[xmlArticle.title].comment,
      }),
    );

    await createEvaluatedArticles(newArticles);
  }
};
