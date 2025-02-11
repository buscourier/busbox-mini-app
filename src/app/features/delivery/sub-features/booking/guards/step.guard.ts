import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { bookingFeature } from '@features/delivery/booking/store/feature';

import { StepNumber } from '../types';

export const stepGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  const stepNumber = getStepNumber(route.url[0].path);

  return store.select(bookingFeature.selectCanAccessStep(stepNumber)).pipe(
    map((canAccess) => {
      if (!canAccess) {
        return router.createUrlTree(['/delivery/booking/applicant']);
      }

      return true;
    }),
  );
};

function getStepNumber(path: string): StepNumber {
  const pathToStep: Record<string, StepNumber> = {
    applicant: 1,
    sender: 2,
    recipient: 3,
    review: 4,
  };

  return pathToStep[path] || 1;
}
