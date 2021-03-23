import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  title: string = ''
  titleSubs$: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.titleSubs$ = this.getRoutesData()
      .subscribe(({ title }) => {
        this.title = title
        document.title = `AdminPro - ${title}`
      })
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe()
  }

  getRoutesData() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }
}
