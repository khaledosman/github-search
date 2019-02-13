import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { IUser } from '../model/user.interface'

@Component({
  selector: 'app-user',
  template: `
    <div class="user">
      <div class="user__avatar">
        <img [src]="user.avatarUrl" />
      </div>
      <div class="user__info">
          <a [href]="user.url">{{user.name}}</a>
          <p>{{user.bio}}</p>
          <span>{{user.location}}</span>

      </div>
    </div>
  `,
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  @Input() public user: IUser

  constructor () { }

  public ngOnInit () {
  }

}
