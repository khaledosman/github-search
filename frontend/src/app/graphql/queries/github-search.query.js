import { gql } from 'apollo-angular'
// TODO: webpack graphql loader for .gql files would be nice
export const GITHUB_SEARCH_QUERY = gql`
  query search ($query: String!, $type:SearchType!, $first: Int, $after: String, $before: String, $last: Int) {
    search (query: $query, type: $type, first: $first, after: $after, before: $before, last: $last) {
      userCount
      edges {
        cursor
        node {
          ...on User {
            avatarUrl
            bio
            company
            email
            followers {
              totalCount
            }
            following {
              totalCount
            }
            gists {
              totalCount
            }
            id
            location
            name
            repositories {
              totalCount
            }
            repositoriesContributedTo {
              totalCount
            }
            starredRepositories {
              totalCount
            }
            url
          }
        }
      }
    }
  }`
