export type Sentiment = "positive" | "neutral" | "negative";

export type ChatAnswer = {
  title: string;
  sentiment: Sentiment;
  comment: string;
};
