export type Sentiment = "positive" | "negative";

export type ChatAnswer = {
  title: string;
  sentiment: Sentiment;
  comment: string;
};
