import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core'
import { IUser } from '../../model/iuser.interface'

@Component({
  selector: 'app-user',
  template: `
    <div class="user">
      <div class="user__avatar">
        <img [src]="user.avatarUrl" />
      </div>
      <div class="user__info">
          <a [href]="user.url" target="_blank">{{user.name}}</a>
          <p>{{user.bio}}</p>
          <span>{{user.location}}</span>
      </div>
      <div class="user__meta">
      <span> followers: {{user.followers.totalCount}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

  @Input() public user: IUser

}
