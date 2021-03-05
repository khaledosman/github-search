import { QueryRef } from 'apollo-angular'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { GithubSearchService } from './github-search.service'
import { IUser } from './model/iuser.interface'
import axios from 'axios'

@Component({
  selector: 'app-root',
  template: `
    <main>
      <!-- <router-outlet> </router-outlet> -->
      <button (click)="handleButtonClicked($event)"> Login with GitHub </button>
      <app-search (onSearchChanged)="handleSearchChanged($event)" [placeholder]="'Enter a username'">
        <h5 style="text-align: center;"> Search for github users: </h5>
      </app-search>
      <app-users-list
        [users]="users"
        [pageLimit]="pageLimit"
        [userCount]="userCount"
        (onNext)="handleFetchNext($event)"
        (onPrevious)="handleFetchPrevious($event)">
          <p *ngIf="isLoading"> fetching data... </p>
      </app-users-list>
    </main>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  public static lastItemCursor = null
  public static firstItemCursor = null

  private clientId = '07488d84f6d016be14ed'
  private redirectUri = 'https://khaledosman.github.io/github-search'
  private state = 'super random' + Math.random()

  // rendered state
  public title = 'github-search'
  public userCount: number
  public users: IUser[] = []
  public isLoading: boolean

  // private state
  public pageLimit = 10
  private query: QueryRef<any>

  constructor (private githubSearchService: GithubSearchService, private cd: ChangeDetectorRef, private route: ActivatedRoute) {}

  public handleSearchChanged (newValue) {
    this._resetState()
    this.isLoading = true

    this.query = this.githubSearchService.searchUsers({
      query: newValue,
      type: 'USER',
      first: this.pageLimit
    })

    this._subscribeToQueryChanges()
  }

  public handleFetchNext (event) {
    event.stopPropagation()
    this.fetchMore({ after: AppComponent.lastItemCursor, before: null, first: this.pageLimit, last: null })
  }

  public async ngOnInit () {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
  
    if (code) {
      const response = await axios.get(`https://my-github-search.herokuapp.com/authenticate/${code}`)
      window.localStorage.setItem('gh_token', response.data.token)
    }
  }

  public handleButtonClicked (event) {
    event.stopPropagation()
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${this.state}&scope=user:email,read:user`
  }

  public handleFetchPrevious (event) {
    event.stopPropagation()
    this.fetchMore({ before: AppComponent.firstItemCursor, after: null, last: this.pageLimit, first: null })
  }

  public fetchMore (queryVars) {
    this.isLoading = true
    this.query.fetchMore({
      variables: {
        ...queryVars
      },
      updateQuery: (previousResult, { fetchMoreResult: newResult }) => {
        const newSearchResults = newResult.search

        // update internal reference to cursor
        this._updateCursorsFromResults(newSearchResults.edges)

        // manually updates apollo cache, merges old results with new results
        return {
          search: {
            ...previousResult.search,
            userCount: newResult.search.userCount,
            edges: [...newResult.search.edges, ...previousResult.search.edges]
          }
        }
      }
    })
  }

  private _subscribeToQueryChanges () {
    this.query
      .valueChanges
      .subscribe((({ data, loading, errors }) => {
        if (loading) {
          this.isLoading = true
        } else if (errors) {
          console.error(errors)
          this.isLoading = false
        } else if (data) {
          this.isLoading = false
          const { edges, userCount } = data.search
          this.userCount = userCount
          // show the first 10 users only
          // the first 10 are the newest since we're adding new results to the beginning of the cache in updateQuery
          const newestTenEdges = edges.slice(0, 10)
          this.users = newestTenEdges.map((edge) => edge.node)
          this._updateCursorsFromResults(newestTenEdges)
        } else {
          this._resetState()
        }
        this.cd.markForCheck()
      }))
  }

  private _updateCursorsFromResults (newEdges) {
    if (newEdges && newEdges.length) {
      AppComponent.lastItemCursor = newEdges[newEdges.length - 1].cursor
      AppComponent.firstItemCursor = newEdges[0].cursor
    }
  }

  private _resetState () {
    AppComponent.lastItemCursor = null
    AppComponent.firstItemCursor = null
    this.userCount = null
    this.users = []
    this.isLoading = false
  }
}
