import { createCMAClient } from "./create-cma-client";

export const deleteEvaluatedArticles = async (ids: string[]) => {
  const client = createCMAClient();

  await client.items.bulkDestroy({
    items: ids.map((id) => ({ type: "item", id })),
  });
};
