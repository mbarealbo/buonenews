import { purgeEvaluatedArticles } from "@/utils/articles/purge-evaluated-articles";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const authToken = request.headers.get("Authorization");
  if (authToken !== `Bearer ${import.meta.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ status: "unauthorized" }), {
      status: 401,
    });
  }

  console.time("purgeEvaluatedArticles");
  await purgeEvaluatedArticles({ maxArticlesStored: 30 });
  console.timeEnd("purgeEvaluatedArticles");

  return new Response(JSON.stringify({ status: "ok" }));
};
