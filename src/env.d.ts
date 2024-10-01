/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly OPENAI_API_KEY: string;
  readonly DATOCMS_API_TOKEN: string;
  readonly DATOCMS_API_URL: string;
  readonly DATOCMS_ARTICLE_ITEM_TYPE_ID: string;
  readonly CRON_SECRET: string;
}
