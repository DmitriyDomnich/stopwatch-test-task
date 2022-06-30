import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, of, switchMap } from 'rxjs';

interface StopWatch {
  value: number;
  isPaused: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  private stopWatchStateSubject = new BehaviorSubject<StopWatch>({
    isPaused: true,
    value: -1,
  });

  stopWatch$ = this.stopWatchStateSubject.asObservable().pipe(
    switchMap(({ isPaused, value }) =>
      isPaused
        ? of(value)
        : interval(1000).pipe(
            map((val) => {
              this.stopWatchStateSubject.getValue().value = value + val + 1;
              return this.stopWatchStateSubject.getValue().value;
            })
          )
    )
  );

  start() {
    const { isPaused, value } = this.stopWatchStateSubject.getValue();
    if (isPaused) {
      this.stopWatchStateSubject.next({
        isPaused: false,
        value: value,
      });
    }
  }
  stop() {
    this.stopWatchStateSubject.next({
      isPaused: true,
      value: -1,
    });
  }
  wait() {
    const { isPaused, value } = this.stopWatchStateSubject.getValue();
    if (!isPaused) {
      this.stopWatchStateSubject.next({
        isPaused: true,
        value,
      });
    }
  }
  reset() {
    // ! doesn't reset instantly without next line
    this.stopWatchStateSubject.next({
      isPaused: true,
      value: -1,
    });
    this.stopWatchStateSubject.next({
      isPaused: false,
      value: -1,
    });
  }

  constructor() {}
}
