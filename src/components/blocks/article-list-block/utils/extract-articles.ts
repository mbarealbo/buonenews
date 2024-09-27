import type { PublicationFragment } from "@/codegen/graphql";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { XMLParser } from "fast-xml-parser";
import sanitize from "sanitize-html";
import { isValidArticle } from "./is-valid-article";

const parser = new XMLParser();

export type Article = {
  title: string;
  description: string;
  link: string;
  pubDate: number;
  formattedDateTime: string;
  organization: string;
};

export const extractArticles = async (publications: PublicationFragment[]) => {
  const articles = await Promise.all(
    publications.map(async (publication) => {
      const xml = await downloadXml(publication.rssLink);
      const json = parser.parse(xml);

      if (!json.rss) {
        console.log(`Failed to parse RSS for ${publication.organization}`);
        console.log(json);
      }
      const articles: Article[] = json.rss.channel.item;

      return articles.filter(isValidArticle).map((rssItem) => {
        const datetime = new Date(rssItem.pubDate);
        return {
          title: sanitize(rssItem.title.trim()),
          description: sanitize(rssItem.description.trim()),
          link: rssItem.link,
          pubDate: datetime.getTime(),
          organization: publication.organization,
          formattedDateTime: format(datetime, "d MMMM yyyy, HH:mm", {
            locale: it,
          }),
        };
      });
    }),
  );

  const data = articles.flat();
  data.sort((a, b) => b.pubDate - a.pubDate);

  return data;
};

async function downloadXml(url: string) {
  return fetch(url).then((res) => res.text());
}
