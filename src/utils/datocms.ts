import {
  PageDocument,
  type PageFragment,
  PromptDocument,
  type PromptFragment,
  PublicationDocument,
  type PublicationFragment,
  type ResponsiveImage,
  SiteDocument,
} from "@/codegen/graphql";
import { createGraphQLClient } from "@/utils";

export const fetchPages = async (): Promise<PageFragment[]> => {
  const client = createGraphQLClient();
  const query = await client.request(PageDocument);
  return query.allPages;
};

export const fetchSiteData = async () => {
  const client = createGraphQLClient();
  const query = await client.request(SiteDocument);
  return query._site;
};

export const fetchPublications = async (): Promise<PublicationFragment[]> => {
  const client = createGraphQLClient();
  const query = await client.request(PublicationDocument);
  const publications = query.allPublications.filter(
    (publication) => publication.enabled,
  );

  return publications;
};

export const fetchPrompt = async (): Promise<PromptFragment> => {
  const client = createGraphQLClient();
  const query = await client.request(PromptDocument);

  if (!query.prompt) {
    throw new Error("failed to fetch AI Prompts");
  }

  return query.prompt;
};
