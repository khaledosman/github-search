import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core'
import { QueryRef } from 'apollo-angular'
import { GithubSearchService } from './github-search.service'
import { IUser } from './model/user.interface'

@Component({
  selector: 'app-root',
  template: `
    <!-- <router-outlet> </router-outlet> -->
    <app-search (onSearchChanged)="handleSearchChanged($event)" [placeholder]="'enter a username'">
      <h5> Search for github users: </h5>
    </app-search>
    <div *ngIf="isLoading"> Loading... </div>
    <app-users-list
      [users]="users"
      [pageLimit]="pageLimit"
      [userCount]="userCount"
      (onNext)="handleFetchNext($event)"
      (onPrevious)="handleFetchPrevious($event)">
    </app-users-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  public static lastItemCursor = null
  public static firstItemCursor = null

  // rendered state
  public title = 'github-search'
  public userCount: number
  public users: IUser[] = []
  public isLoading: boolean

  // private state
  private query: QueryRef<any>
  private pageLimit = 10

  constructor (private githubSearchService: GithubSearchService, private cd: ChangeDetectorRef) {}

  public handleSearchChanged (newValue) {
    this._resetState()
    this.isLoading = true
    // this.cd.detectChanges()
    // reset state
    console.log({ newValue })

    this.query = this.githubSearchService.searchUsers({
      query: newValue,
      type: 'USER',
      first: this.pageLimit
    })

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
          console.log({ data, loading, errors })
          const { edges, userCount } = data.search
          this.userCount = userCount
          // show the last 10 users only
          const newestTenEdges = edges.slice(0, 10)
          this.users = newestTenEdges.map((edge) => edge.node)
          // const lastItemsCursor = edges[edges.length - 1].cursor
          AppComponent.lastItemCursor = newestTenEdges[newestTenEdges.length - 1].cursor
          AppComponent.firstItemCursor = newestTenEdges[0].cursor
        } else {
          this._resetState()
        }
        this.cd.markForCheck()
      }))
  }
  public handleFetchNext (event) {
    this.fetchMore({ after: AppComponent.lastItemCursor, before: null, first: this.pageLimit, last: null })
  }

  public handleFetchPrevious (event) {
    this.fetchMore({ before: AppComponent.firstItemCursor, after: null, last: this.pageLimit, first: null })
  }

  public fetchMore (queryVars) {
    this.isLoading = true
    this.query.fetchMore({
      // We are able to figure out which offset to use because it matches
      // the feed length, but we could also use state, or the previous
      // variables to calculate this (see the cursor example below)
      variables: {
        ...queryVars
      },
      updateQuery: (previousResult, { fetchMoreResult: newResult }) => {
        console.log({ previousResult, newResult })
        const newSearchResults = newResult.search

        // update internal reference to cursor
        const lastItemsCursor = newSearchResults.edges[newSearchResults.edges.length - 1].cursor
        AppComponent.lastItemCursor = lastItemsCursor
        AppComponent.firstItemCursor = newSearchResults.edges[0].cursor

        return {
          search: {
            ...previousResult.search,
            userCount: previousResult.search.userCount,
            edges: [...newResult.search.edges, ...previousResult.search.edges]
          }
        }
      }
    })
  }

  private _resetState () {
    AppComponent.lastItemCursor = null
    AppComponent.firstItemCursor = null
    this.userCount = null
    this.users = []
    this.isLoading = false

  }
}
