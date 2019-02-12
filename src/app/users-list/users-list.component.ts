import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { IUser } from '../model/user.interface'

@Component({
  selector: 'app-users-list',
  template: `
  <section>
  <h3> {{userCount}} </h3>
    <div *ngFor="let user of users">
      <app-user [user]="user"></app-user>
    </div>
  </section>
  `,
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UsersListComponent {

  @Input() public userCount: number = 0
  @Input() public users: IUser[] = []

  constructor () { }

}
