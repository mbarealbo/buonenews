import OpenAI from "openai";
import { createChatMessages } from "./create-chat-messages";
import { parseChatCompletion } from "./parse-chat-completion";

import type { XmlArticle } from "../articles/types";
import type { ChatAnswer } from "./types";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const evaluateXmlArticles = async (xmlArticles: XmlArticle[]) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: await createChatMessages(xmlArticles),
  });

  const answers: ChatAnswer[] = parseChatCompletion(completion);

  return answers.reduce(
    (acc, curr) => {
      acc[curr.title] = curr;
      return acc;
    },
    {} as Record<string, ChatAnswer>,
  );
};
