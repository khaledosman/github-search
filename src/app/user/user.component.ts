import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { IUser } from '../model/user.interface'

@Component({
  selector: 'app-user',
  template: `
    <p>
      {{user.email}}
    </p>
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
