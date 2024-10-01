import { syncEvaluatedArticles } from "@/utils/articles/sync-evaluated-articles";

export async function GET() {
  await syncEvaluatedArticles({
    maxArticlesStored: 30,
    maxArticlesPerPublication: 5,
  });

  return new Response(JSON.stringify({ status: "ok" }));
}
