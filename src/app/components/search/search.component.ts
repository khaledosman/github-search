import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input
  , Output, ViewChild, ViewEncapsulation } from '@angular/core'
import { fromEvent } from 'rxjs'
import { debounceTime, tap } from 'rxjs/operators'
@Component({
  selector: 'app-search',
  template: `
    <ng-container>
      <ng-content></ng-content>
      <input #searchField type="text" [value]="value" [placeholder]="placeholder" />
    </ng-container>`,
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SearchComponent {
  @Input() public placeholder: string = ''
  @Output() public onSearchChanged = new EventEmitter<string>()
  public value = ''
  @ViewChild('searchField') private el: ElementRef
  constructor () { }

  public ngAfterViewInit (): void {
    fromEvent(this.el.nativeElement, 'keyup')
    .pipe(
      debounceTime(500),
      tap((event: any) => this.value = this.el.nativeElement.value)
    ).subscribe((event: any) => {
      this.onSearchChanged.emit(this.el.nativeElement.value)
    })
  }
}
