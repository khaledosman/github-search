import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { GITHUB_SEARCH_QUERY } from './queries/github-search.query'

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor (private apollo: Apollo) { }

  public searchUsers ({ query, type, first, after }) {
    return this.apollo.watchQuery({
      query: GITHUB_SEARCH_QUERY,
      variables: {
        type,
        query,
        first,
        after
      },
      fetchPolicy: 'cache-first'
    })
  }
}
