import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';

import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { bookingFeature } from '../store/feature';

export const bookingResultGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  const isSuccessPage = route.routeConfig?.path === 'success';
  const selector = isSuccessPage
    ? bookingFeature.selectIsSubmitSuccessful
    : bookingFeature.selectIsSubmitFailed;

  return store.select(selector).pipe(
    take(1),
    map((canAccess) => {
      if (canAccess) {
        return true;
      }

      return router.createUrlTree(['/delivery/booking/applicant']);
    }),
  );
};
