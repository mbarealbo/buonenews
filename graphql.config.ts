import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.DATOCMS_API_URL as string]: {
      headers: {
        Authorization: process.env.DATOCMS_API_TOKEN as string,
        "X-Exclude-Invalid": "true",
      },
    },
  },
  documents: ["./src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/codegen/": {
      preset: "client",
      config: {
        useTypeImports: true,
        useIndexSignature: true,
        strictScalars: true,
        scalars: {
          BooleanType: "boolean",
          CustomData: "Record<string, string>",
          Date: "string",
          DateTime: "string",
          FloatType: "number",
          IntType: "number",
          ItemId: "string",
          JsonField: "unknown",
          MetaTagAttributes: "Record<string, string>",
          UploadId: "string",
        },
      },
    },
  },
};

export default config;