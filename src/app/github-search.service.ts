import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor (private apollo: Apollo) { }

  public searchUsers ({ query, type, first, after }) {
    return this.apollo.watchQuery({
      query: gql`
          query search ($query: String!, $type:SearchType!, $first: Int, $after: String) {
            search (query: $query, type: $type, first: $first, after: $after) {
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

        }`,
      variables: {
        type,
        query,
        first,
        after
      }
    })
  }
}
