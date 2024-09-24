import { gql } from "graphql-request";
import { createGraphQLClient } from "./graphql-client.js";

const document = gql`
  query {
    allPublications {
      id
      rssLink
    }
  }
`;

type Publication = {
  id: string;
  rssLink: string;
};

type PublicationQuery = {
  allPublications: Publication[];
};

export const fetchRssLinks = async () => {
  const client = createGraphQLClient();
  const query = await client.request<PublicationQuery>(document);
  return query.allPublications.map((publication) => publication.rssLink);
};
