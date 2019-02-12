import gql from 'graphql-tag'
export const GITHUB_SEARCH_QUERY = gql`
  query search ($query: String!, $type:SearchType!, $first: Int, $after: String) {
    search (query: $query, type: $type, first: $first, after: $after) {
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