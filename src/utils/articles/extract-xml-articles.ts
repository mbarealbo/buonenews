import type { PublicationFragment } from "@/codegen/graphql";
import { XMLParser } from "fast-xml-parser";
import sanitize from "sanitize-html";
import { downloadXml } from "../common/download-xml";
import { isValidXmlArticle } from "./is-valid-xml-article";
import type { XmlArticle } from "./types";

const parser = new XMLParser();

export const extractXmlArticles = async (
  publications: PublicationFragment[],
  maxArticlesPerPublication: number,
): Promise<XmlArticle[]> => {
  const promises = publications.map(async (publication) => {
    const xml = await downloadXml(publication.rssLink);
    const json = parser.parse(xml);

    if (!json.rss) {
      console.log(`Failed to parse RSS for ${publication.organization}`);
      return [];
    }

    const xmlArticles: XmlArticle[] = json.rss.channel.item;

    return xmlArticles
      .filter(isValidXmlArticle)
      .slice(0, maxArticlesPerPublication)
      .map((rssItem) => {
        const datetime = new Date(rssItem.pubDate);

        const item = {
          title: sanitize(rssItem.title.trim()),
          description: sanitize(rssItem.description.trim()),
          link: rssItem.link,
          pubDate: datetime.getTime(),
          organization: publication.organization,
        };

        return item;
      });
  });

  const articles = await Promise.all(promises);
  const data = articles.flat();

  return data;
};
