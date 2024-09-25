import { gql } from "graphql-request";
import { createGraphQLClient } from "./graphql-client.js";

const document = gql`
  query {
    aiPrompt {
      system
      user
    }
  }
`;

type Prompt = {
  system: string;
  user: string;
};

type PromptQuery = {
  aiPrompt: Prompt;
};

export const fetchAIPrompts = async () => {
  const client = createGraphQLClient();
  const query = await client.request<PromptQuery>(document);
  return query.aiPrompt;
};
