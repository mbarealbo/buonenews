import OpenAI from "openai";
import { fetchAIPrompt } from "./fetch-ai-prompt.js";

import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { RssItem } from "./extract-rss-items.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ItemWithSentiment = {
  link: string;
  sentiment: "positive" | "neutral" | "negative";
};

type EvaluatedRssItem = {
  item: RssItem;
  sentiment: ItemWithSentiment["sentiment"];
};

export const evaluateRssItems = async (
  items: RssItem[],
): Promise<EvaluatedRssItem[]> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: await getMessages(items),
  });

  const answers: ItemWithSentiment[] = parseChatCompletion(completion);

  const mappedAnswers = answers.reduce(
    (acc, curr) => {
      acc[curr.link] = curr.sentiment;
      return acc;
    },
    {} as Record<string, ItemWithSentiment["sentiment"]>,
  );

  return items.map((item) => ({
    item,
    sentiment: mappedAnswers[item.link] || "neutral",
  }));
};

function parseChatCompletion(completion: OpenAI.ChatCompletion) {
  const answer = completion.choices[0].message.content;

  if (!answer) {
    console.error(`Failed to evaluate. Answer: "${completion}"`);
    throw new Error("evaluation failed");
  }

  const startIndex = answer.indexOf("[");
  const endIndex = answer.indexOf("]");
  const json = answer.slice(startIndex, endIndex + 1);

  return JSON.parse(json);
}

async function getMessages(
  items: RssItem[],
): Promise<ChatCompletionMessageParam[]> {
  const aiPrompt = await fetchAIPrompt();

  const compactItems = items.map((item) => ({
    link: item.link,
    title: item.title,
    description: item.description,
  }));

  const compiled = new Function(
    "data",
    `const { items } = data; return \`${aiPrompt.user.replace("{{items}}", JSON.stringify(compactItems))}\`;`,
  );

  const userContent = compiled({ items: compactItems });

  return [
    {
      role: "system",
      content: aiPrompt.system,
    },
    {
      role: "user",
      content: userContent,
    },
  ];
}
