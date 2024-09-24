import OpenAI from "openai";
import { fetchAIPrompt } from "./fetch-ai-prompt.js";

import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { Article, RssItem } from "./extract-articles.js";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

type Sentiment = "positive" | "neutral" | "negative";

type ChatAnswer = {
  link: string;
  sentiment: Sentiment;
  comment: string;
};

type EvaluatedArticle = {
  article: Article;
  sentiment: Sentiment;
  comment: string;
};

export const evaluateArticles = async (
  articles: Article[],
): Promise<EvaluatedArticle[]> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: await getMessages(articles),
  });

  const answers: ChatAnswer[] = parseChatCompletion(completion);

  const aiAnswers = answers.reduce(
    (acc, curr) => {
      acc[curr.link] = {
        link: curr.link,
        sentiment: curr.sentiment,
        comment: curr.comment,
      };
      return acc;
    },
    {} as Record<string, ChatAnswer>,
  );

  console.log(JSON.stringify(articles));
  console.log(JSON.stringify(aiAnswers));

  return articles
    .filter((article) => aiAnswers[article.link])
    .map((article) => {
      const aiAnswer = aiAnswers[article.link];
      return {
        article,
        sentiment: aiAnswer.sentiment,
        comment: aiAnswer.comment,
      };
    });
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
  articles: Article[],
): Promise<ChatCompletionMessageParam[]> {
  const aiPrompt = await fetchAIPrompt();

  const compactArticles = articles.map((article) => ({
    link: article.link,
    title: article.title,
    description: article.description,
  }));

  const compiled = new Function(
    "data",
    `const { items } = data; return \`${aiPrompt.user.replace("{{items}}", JSON.stringify(compactArticles))}\`;`,
  );

  const userContent = compiled({ items: compactArticles });

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
