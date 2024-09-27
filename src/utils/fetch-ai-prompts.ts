import { AiPromptDocument, type AiPromptQuery } from "@/codegen/graphql";
import { createGraphQLClient } from "./graphql-client";

export const fetchAIPrompts = async () => {
  const client = createGraphQLClient();
  const query = await client.request<AiPromptQuery>(AiPromptDocument);
  return query.aiPrompt;
};
