import OpenAI from "openai";

import type { Article } from "../utils/extract-articles";
import { getMessages } from "./get-messages";
import { parseChatCompletion } from "./parse-chat-completion";

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
