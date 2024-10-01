import type OpenAI from "openai";

export function parseChatCompletion(completion: OpenAI.ChatCompletion) {
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
