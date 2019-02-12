import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-search',
  template: `
    <ng-container>
      <input type="text" [value]="value" (input)="handleChange($event)" />
    </ng-container>`,
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SearchComponent implements OnInit {
  @Input() public value: string = ''
  @Output() public onSearchChanged = new EventEmitter<any>()
  constructor () { }

  public ngOnInit () {
  }

  public handleChange ($event) {
    console.log('event', $event)
    this.onSearchChanged.emit($event)
  }

}
