import {
  PageDocument,
  type PageFragment,
  PromptDocument,
  type PromptFragment,
  PublicationDocument,
  type PublicationFragment,
  SiteDocument,
} from "@/codegen/graphql";
import type { EvaluatedArticle } from "@/components/blocks/article-list-block/openai";
import type { Article } from "@/components/blocks/article-list-block/utils";
import { createGraphQLClient } from "@/utils";
import { buildClient } from "@datocms/cma-client-node";

const createDatoCMSClient = () => {
  const client = buildClient({
    apiToken: import.meta.env.DATOCMS_API_TOKEN,
  });

  return client;
};

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
  return query.allPublications.filter((pub) => pub.enabled);
};

export const fetchPrompt = async (): Promise<PromptFragment> => {
  const client = createGraphQLClient();
  const query = await client.request(PromptDocument);

  if (!query.prompt) {
    throw new Error("failed to fetch AI Prompts");
  }

  return query.prompt;
};

export const fetchEvaluatedArticles = async () => {
  const client = createDatoCMSClient();

  const items = await client.items.list({
    filter: { type: import.meta.env.DATOCMS_ARTICLE_ITEM_TYPE_ID },
  });

  return items;
};

export const createArticles = async (evaluatedArticles: EvaluatedArticle[]) => {
  const client = createDatoCMSClient();

  const promises = evaluatedArticles.map(async (data) => {
    const item = await client.items.create({
      item_type: {
        type: "item_type",
        id: import.meta.env.DATOCMS_ARTICLE_ITEM_TYPE_ID,
      },
      link: data.article.link,
      organization: data.article.organization,
      formatted_datetime: data.article.formattedDateTime,
      title: data.article.title,
      sentiment: data.sentiment,
      comment: data.comment,
    });

    return item;
  });

  await Promise.all(promises);
};
