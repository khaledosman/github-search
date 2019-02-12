import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core'
import { QueryRef } from 'apollo-angular'
import { GithubSearchService } from './github-search.service'
import { IUser } from './model/user.interface'

@Component({
  selector: 'app-root',
  template: `
    <!-- <router-outlet> </router-outlet> -->
    <app-search (onSearchChanged)="handleSearchChanged($event)" [placeholder]="'search for users here'"></app-search>
    <div *ngIf="isLoading"> Loading... </div>
    <app-users-list [users]="users" [userCount]="userCount">

    </app-users-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  public static cursor = null

  // rendered state
  public title = 'github-search'
  public userCount: number = 0
  public users: IUser[] = []
  public isLoading: boolean = false

  // private state
  private query: QueryRef<any>
  private pageLimit = 10

  constructor (private githubSearchService: GithubSearchService, private cd: ChangeDetectorRef) {}

  public handleSearchChanged (newValue) {
    // reset state
    AppComponent.cursor = null
    this.userCount = 0
    this.users = []
    this.isLoading = false

    console.log({ newValue })

    this.query = this.githubSearchService.searchUsers({
      query: newValue,
      type: 'USER',
      first: this.pageLimit,
      after: AppComponent.cursor
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
          const lastItemsCursor = edges[edges.length - 1].cursor
          AppComponent.cursor = lastItemsCursor
          this.userCount = userCount
          this.users = edges.map((edge) => edge.node)
          this.cd.markForCheck()
        } else {
          AppComponent.cursor = null
          this.userCount = 0
          this.users = []
          this.cd.markForCheck()
        }
      }))
  }

  public fetchMore () {
    this.query.fetchMore({
      // We are able to figure out which offset to use because it matches
      // the feed length, but we could also use state, or the previous
      // variables to calculate this (see the cursor example below)
      variables: {
        cursor: AppComponent.cursor
      },
      updateQuery: (previousResult, { fetchMoreResult: newResult }) => {

        console.log({ previousResult, newResult })
        const newSearchResults = newResult.search

        // update internal reference to cursor
        const lastItemsCursor = newSearchResults.edges[newSearchResults.edges.length - 1].cursor
        AppComponent.cursor = lastItemsCursor

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
}
