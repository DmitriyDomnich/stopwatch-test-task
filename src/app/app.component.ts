import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  auditTime,
  buffer,
  filter,
  fromEvent,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { StopwatchService } from './stopwatch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('wait', { static: true, read: ElementRef })
  waitBtnRef: ElementRef<HTMLButtonElement>;

  stopWatch$: Observable<number>;
  waitBtnClickSub: Subscription;

  ngOnInit() {
    this.stopWatch$ = this.stopwatchService.stopWatch$;

    const waitBtnClick$ = fromEvent(this.waitBtnRef.nativeElement, 'click');

    this.waitBtnClickSub = fromEvent(this.waitBtnRef.nativeElement, 'click')
      .pipe(
        buffer(waitBtnClick$.pipe(auditTime(500))),
        filter((clicks) => clicks.length === 2),
        tap((_) => this.stopwatchService.wait())
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.waitBtnClickSub.unsubscribe();
  }
  constructor(public stopwatchService: StopwatchService) {}
}
