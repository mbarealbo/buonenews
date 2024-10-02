import { syncEvaluatedArticles } from "@/utils/articles/sync-evaluated-articles";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const authToken = request.headers.get("Authorization");
  if (authToken !== `Bearer ${import.meta.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ status: "unauthorized" }), {
      status: 401,
    });
  }

  console.time("syncEvaluatedArticles");
  await syncEvaluatedArticles({ maxArticlesPerPublication: 2 });
  console.timeEnd("syncEvaluatedArticles");

  return new Response(JSON.stringify({ status: "ok" }));
};
