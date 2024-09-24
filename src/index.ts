import * as utils from "./utils/index.js";

async function main() {
  const links = await utils.fetchRssLinks();
  const items = await utils.extractRssItems(links);
  const evaluated = await utils.evaluateRssItems(items);

  const positiveItems = evaluated.filter(
    (item) => item.sentiment === "positive",
  );

  console.log(positiveItems);
}

main();
