import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, Observable, shareReplay, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryLayoutService {
  private router = inject(Router);

  private isMainLayout$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(new NavigationEnd(0, this.router.url, this.router.url)),
    map((event: NavigationEnd) => {
      const url = event.url;
      return !(url.includes('/booking/success') || url.includes('/booking/failure'));
    }),
    shareReplay(1), // Кэшируем последнее значение для всех подписчиков
  );

  private isCalculatorLayout$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(new NavigationEnd(0, this.router.url, this.router.url)),
    map((event: NavigationEnd) => {
      return event.url.includes('/calculator');
    }),
    shareReplay(1),
  );

  getIsMainLayout(): Observable<boolean> {
    return this.isMainLayout$;
  }

  getIsCalculatorLayout(): Observable<boolean> {
    return this.isCalculatorLayout$;
  }
}
