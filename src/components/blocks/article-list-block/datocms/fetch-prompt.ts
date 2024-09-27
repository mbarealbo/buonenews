import { PromptDocument, type PromptFragment } from "@/codegen/graphql";
import { createGraphQLClient } from "@/utils";

export const fetchPrompt = async (): Promise<PromptFragment> => {
  const client = createGraphQLClient();
  const query = await client.request(PromptDocument);

  if (!query.prompt) {
    throw new Error("failed to fetch AI Prompts");
  }

  return query.prompt;
};
