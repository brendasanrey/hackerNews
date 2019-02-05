/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const ALL_LINKS = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

export const CREATE_LINK = gql`
  mutation CreateLink($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
