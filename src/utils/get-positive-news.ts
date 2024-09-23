import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type News = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

export const getPositiveNews = async (news: News[]) => {
  const newsToUse = news.slice(0, 3);

  for (const news of newsToUse) {
    console.log(news.title);
    const sentiment = await getSentiment(news.title);
    console.log(sentiment);
  }
};

async function getSentiment(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "Sei un'AI che analizza il sentiment di un testo. Restituisci solo la valutazione del sentiment in formato JSON: positivo, negativo, o neutro.",
      },
      {
        role: "user",
        content: `Analizza il sentiment del seguente testo e restituisci il risultato in JSON: ${text}`,
      },
    ],
  });

  return completion;
}
