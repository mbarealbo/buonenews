import OpenAI from "openai";
import { fetchAIPrompts } from "./fetch-ai-prompts.js";

import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { Article } from "./extract-articles.js";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export type Sentiment = "positive" | "neutral" | "negative";

type ChatAnswer = {
  title: string;
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
    model: "gpt-4o-mini",
    messages: await getMessages(articles),
  });

  const answers: ChatAnswer[] = parseChatCompletion(completion);

  const aiAnswers = answers.reduce(
    (acc, curr) => {
      acc[curr.title] = curr;
      return acc;
    },
    {} as Record<string, ChatAnswer>,
  );

  return articles.map((article) => {
    const aiAnswer = aiAnswers[article.title];

    if (!aiAnswer) {
      const errrorMessage = `Failed to find AI Answer for article "${article.title}"`;
      console.error(errrorMessage);
      throw new Error(errrorMessage);
    }

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
  const aiPrompts = await fetchAIPrompts();

  const compactArticles = articles.map((article) => ({
    title: article.title,
    description: article.description,
  }));

  const compiled = new Function(
    "data",
    `const { items } = data; return \`${aiPrompts.user.replace("{{items}}", JSON.stringify(compactArticles))}\`;`,
  );

  const userContent = compiled({ items: compactArticles });

  return [
    {
      role: "system",
      content: aiPrompts.system,
    },
    {
      role: "user",
      content: userContent,
    },
  ];
}
