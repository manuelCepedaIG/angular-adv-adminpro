import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Data, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string;
  public titleSubs$: Subscription;

  constructor(
      private router: Router,
      private route: ActivatedRoute) {

    this.titleSubs$ = this.getargumentosRuta()
                            .subscribe(res => { 
                              this.title = res.title;
                              document.title = `AdminPro - ${this.title}`;
                            });
                            
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getargumentosRuta(): Observable<Data> {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
  }

  
}
