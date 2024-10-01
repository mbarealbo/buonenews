import * as datocms from "@/utils/datocms/content-delivery-api";

import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { XmlArticle } from "../articles/types";

export async function createChatMessages(
  xmlArticles: XmlArticle[],
): Promise<ChatCompletionMessageParam[]> {
  const prompts = await datocms.fetchPrompt();

  if (!prompts) {
    throw new Error("failed to fetch AI Prompts");
  }

  const compactXmlArticles = xmlArticles.map((article) => ({
    title: article.title,
    description: article.description,
  }));

  const compiled = new Function(
    "data",
    `const { items } = data; return \`${prompts.user.replace("{{items}}", JSON.stringify(compactXmlArticles))}\`;`,
  );

  const userContent = compiled({ items: compactXmlArticles });

  return [
    {
      role: "system",
      content: prompts.system,
    },
    {
      role: "user",
      content: userContent,
    },
  ];
}
