import { Apollo } from 'apollo-angular'
import { Injectable } from '@angular/core'

import { GITHUB_SEARCH_QUERY } from './graphql/queries/github-search.query'

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor (private apollo: Apollo) { }

  public searchUsers ({ query, type, first, after = null, before = null, last = null }) {
    return this.apollo.watchQuery({
      query: GITHUB_SEARCH_QUERY,
      variables: {
        type,
        query,
        first,
        last,
        after,
        before
      },
      fetchPolicy: 'cache-first'
    })
  }
}
