import { syncEvaluatedArticles } from "@/utils/articles/sync-evaluated-articles";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  if (
    request.headers.get("Authorization") !==
    `Bearer ${import.meta.env.CRON_SECRET}`
  ) {
    return new Response(JSON.stringify({ status: "unauthorized" }), {
      status: 401,
    });
  }

  console.time("syncEvaluatedArticles");
  await syncEvaluatedArticles({
    maxArticlesStored: 30,
    maxArticlesPerPublication: 5,
  });
  console.timeEnd("syncEvaluatedArticles");

  return new Response(JSON.stringify({ status: "ok" }));
};
