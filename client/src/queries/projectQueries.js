import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
    }
  }
`;

const GET_PROJECT = gql`
  query getProjectById($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
