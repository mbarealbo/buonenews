import { buildClient } from "@datocms/cma-client-node";

export const createCMAClient = () => {
  const client = buildClient({
    apiToken: import.meta.env.DATOCMS_API_TOKEN,
  });

  return client;
};
