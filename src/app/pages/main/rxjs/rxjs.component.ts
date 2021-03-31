import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  intervalSubs: Subscription

  constructor() {
    // this.return Observable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     value => console.log('Subs: ', value),
    //     err => console.warn(err),
    //     () => console.log('Obs finalize')
    //   )
    this.intervalSubs = this.returnInterval()
      .subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

  returnInterval(): Observable<number> {
    return interval(500)
      .pipe(
        take(10),
        map(value => ++value),
        filter(value => value % 2 === 0),
      )
  }

  returnObservable(): Observable<number> {
    let i = -1
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++
        observer.next(i)

        if (i === 4) {
          clearInterval(interval)
          observer.complete()
        }

        if (i === 2) {
          observer.error('i llego al valor de 2')
        }
      }, 1000)
    })
  }

}
