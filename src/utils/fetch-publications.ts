import { gql } from "graphql-request";
import { createGraphQLClient } from "./graphql-client.js";

const document = gql`
  query {
    allPublications {
      id
      organization
      rssLink
    }
  }
`;

export type Publication = {
  id: string;
  organization: string;
  rssLink: string;
};

type PublicationQuery = {
  allPublications: Publication[];
};

export const fetchPublications = async () => {
  const client = createGraphQLClient();
  const query = await client.request<PublicationQuery>(document);
  return query.allPublications;
};
