import type { Sentiment } from "../openai/types";

const isProd = import.meta.env.PROD;

export const getSentimentByDomain = (domain: string): Sentiment => {
  let sentiment: Sentiment = "positive";

  if (isProd) {
    sentiment = domain.includes("buone") ? "positive" : "negative";
  }

  return sentiment;
};
