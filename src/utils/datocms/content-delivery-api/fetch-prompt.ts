import { PromptDocument, type PromptFragment } from "@/codegen/graphql";
import { createCDAClient } from "./create-cda-client";

export const fetchPrompt = async (): Promise<PromptFragment> => {
  const client = createCDAClient();
  const query = await client.request(PromptDocument);

  if (!query.prompt) {
    throw new Error("failed to fetch AI Prompts");
  }

  return query.prompt;
};
