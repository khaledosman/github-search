import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UsersListComponent implements OnInit {

  constructor () { }

  public ngOnInit () {
  }

}
