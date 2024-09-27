import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { fetchPrompt } from "../datocms/fetch-prompt";
import type { Article } from "../utils/extract-articles";

export async function getMessages(
  articles: Article[],
): Promise<ChatCompletionMessageParam[]> {
  const prompts = await fetchPrompt();

  if (!prompts) {
    throw new Error("failed to fetch AI Prompts");
  }

  const compactArticles = articles.map((article) => ({
    title: article.title,
    description: article.description,
  }));

  const compiled = new Function(
    "data",
    `const { items } = data; return \`${prompts.user.replace("{{items}}", JSON.stringify(compactArticles))}\`;`,
  );

  const userContent = compiled({ items: compactArticles });

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
