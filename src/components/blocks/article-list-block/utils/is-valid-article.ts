import type { Article } from "./extract-articles";

export function isValidArticle(article: Article) {
  return (
    article.title &&
    article.description &&
    article.link &&
    article.pubDate &&
    !Number.isNaN(new Date(article.pubDate).getTime())
  );
}
