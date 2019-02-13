import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core'
import { IUser } from '../model/user.interface'

@Component({
  selector: 'app-users-list',
  template: `
  <section>
  <h3> {{userCount}} </h3>
    <div *ngFor="let user of users trackBy: trackById">
      <app-user [user]="user"></app-user>
    </div>
    <footer>
      <button *ngIf="users.length >= pageLimit" (click)="fetchPrevious($event)">Previous</button>
      <button *ngIf="users.length >= pageLimit" (click)="fetchNext($event)">Next</button>
    </footer>
  </section>
  `,
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UsersListComponent {

  @Input() public userCount: number
  @Input() public users: IUser[] = []
  @Input() public pageLimit: number = 10
  @Output() public onNext: EventEmitter<any> = new EventEmitter()
  @Output() public onPrevious: EventEmitter<any> = new EventEmitter()

  constructor () { }

  public trackById (index, item) {
    return item.id
  }

  public fetchNext ($event) {
    this.onNext.emit($event)

  }

  public fetchPrevious ($event) {
    this.onPrevious.emit($event)
  }

}
