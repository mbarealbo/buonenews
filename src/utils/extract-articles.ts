import { format } from "date-fns";
import { it } from "date-fns/locale";
import { XMLParser } from "fast-xml-parser";
import sanitize from "sanitize-html";

import type { Publication } from "./fetch-publications";

const parser = new XMLParser();

export type RssItem = {
  title: string;
  description: string;
  link: string;
  pubDate: number;
  formattedDateTime: string;
};

export type Article = RssItem & {
  organization: string;
};

export const extractArticles = async (publications: Publication[]) => {
  const articles = await Promise.all(
    publications.map(async (publication) => {
      const xml = await downloadXml(publication.rssLink);
      const json = parser.parse(xml);

      if (!json.rss) {
        console.log(`Failed to parse RSS for ${publication.organization}`);
        console.log(json);
      }
      const rssItems: RssItem[] = json.rss.channel.item;

      return rssItems.filter(isValidRssItem).map((rssItem) => {
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

function isValidRssItem(rssItem: RssItem) {
  return (
    rssItem.title &&
    rssItem.description &&
    rssItem.link &&
    rssItem.pubDate &&
    !Number.isNaN(new Date(rssItem.pubDate).getTime())
  );
}
