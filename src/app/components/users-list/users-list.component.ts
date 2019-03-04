import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
   ViewEncapsulation } from '@angular/core'
import { IUser } from '../../model/iuser.interface'

@Component({
  selector: 'app-users-list',
  template: `
    <section>
      <h4 class="user-list__count" *ngIf="!!userCount"> Count: {{userCount}} </h4>
      <ng-content></ng-content>
      <div *ngFor="let user of users trackBy: trackById">
      <app-user [user]="user"></app-user>
      </div>
      <footer class="footer">
        <button *ngIf="users.length >= pageLimit"
          [disabled]="isButtonsDisabled"
          (click)="fetchPrevious($event)">Previous</button>

        <button *ngIf="users.length >= pageLimit"
          [disabled]="isButtonsDisabled"
          (click)="fetchNext($event)">Next</button>
      </footer>
    </section>
  `,
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UsersListComponent implements OnChanges {

  public isButtonsDisabled: boolean = false
  @Input() public userCount: number
  @Input() public users: IUser[] = []
  @Input() public pageLimit: number = 10
  @Output() public onNext: EventEmitter<any> = new EventEmitter()
  @Output() public onPrevious: EventEmitter<any> = new EventEmitter()

  public trackById (index, item) {
    return item.id
  }

  public ngOnChanges (changes: SimpleChanges): void {
    if (changes.users && !changes.users.isFirstChange()) {
      this.isButtonsDisabled = false
    }
  }

  public fetchNext ($event) {
    this.isButtonsDisabled = true
    this.onNext.emit($event)
  }

  public fetchPrevious ($event) {
    this.isButtonsDisabled = true
    this.onPrevious.emit($event)
  }

}
