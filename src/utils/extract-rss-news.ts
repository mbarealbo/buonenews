import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

export const extractRssNews = async (rssUrls: string[]) => {
  const xmls = await Promise.all(rssUrls.map(downloadXml));

  const news = xmls.map((xml) => {
    const json = parser.parse(xml);
    return json.rss.channel.item;
  });

  return news.flat();
};

async function downloadXml(url: string) {
  return fetch(url).then((res) => res.text());
}
