import { XMLParser } from "fast-xml-parser";
import type { Publication } from "./fetch-publications";

const parser = new XMLParser();

export type RssItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

export type Article = RssItem & {
  organization: string;
};

export const extractArticles = async (publications: Publication[]) => {
  const articles = await Promise.all(
    publications.map(async (publication) => {
      const xml = await downloadXml(publication.rssLink);
      const json = parser.parse(xml);
      const rssItems: RssItem[] = json.rss.channel.item;

      return rssItems.map((rssItem) => {
        return {
          title: rssItem.title,
          description: rssItem.description,
          link: rssItem.link,
          pubDate: rssItem.pubDate,
          organization: publication.organization,
        };
      });
    }),
  );

  const data = articles.flat();
  console.log(data);
  return data;
};

async function downloadXml(url: string) {
  return fetch(url).then((res) => res.text());
}
