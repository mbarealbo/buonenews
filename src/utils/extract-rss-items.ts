import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

export type RssItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

export const extractRssItems = async (rssUrls: string[]) => {
  const xmls = await Promise.all(rssUrls.map(downloadXml));

  const items = xmls.map((xml) => {
    const json = parser.parse(xml);
    const items: RssItem[] = json.rss.channel.item;

    const rssItem = items.map((item) => {
      return {
        title: item.title,
        description: item.description,
        link: item.link,
        pubDate: item.pubDate,
      };
    });

    return rssItem;
  });

  return items.flat();
};

async function downloadXml(url: string) {
  return fetch(url).then((res) => res.text());
}
