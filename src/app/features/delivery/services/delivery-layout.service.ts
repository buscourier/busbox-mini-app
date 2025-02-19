import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryLayoutService {
  private router = inject(Router);

  private isMainLayout$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => {
      const url = (event as NavigationEnd).url;
      return !(url.includes('/booking/success') || url.includes('/booking/failure'));
    }),
    shareReplay(1), // кэшируем последнее значение для всех подписчиков
  );

  getIsMainLayout(): Observable<boolean> {
    return this.isMainLayout$;
  }
}
