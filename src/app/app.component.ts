import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'
import { GithubSearchService } from './github-search.service'

@Component({
  selector: 'app-root',
  template: `
    <!-- <router-outlet> </router-outlet> -->
    <app-search [value]="value" (onSearchChanged)="handleSearchChanged($event)" ></app-search>
    <app-users-list></app-users-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  public title = 'github-search'
  public value = ''
  private pageLimit = 10
  private lastCursor = null
  constructor (private githubSearchService: GithubSearchService) {

  }
  public handleSearchChanged ($event) {
    this.value = $event.target.value
    this.githubSearchService.searchUsers({
      query: this.value,
      type: 'USER',
      first: this.pageLimit,
      after: this.lastCursor
    })
    .valueChanges
    .subscribe((({ data, loading, errors }) => {
      console.log({ data, loading, errors })
    }))
  }
}
