import type { XmlArticle } from "./types";

export function isValidXmlArticle(article: XmlArticle) {
  return (
    article.title &&
    article.description &&
    article.link &&
    article.pubDate &&
    !Number.isNaN(new Date(article.pubDate).getTime())
  );
}
