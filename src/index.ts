import * as utils from "./utils/index.js";

async function main() {
  const rssUrls = await utils.fetchRssUrls();
  const allNews = await utils.extractRssNews(rssUrls);
  const positiveNews = await utils.getPositiveNews(allNews);
}

main();
