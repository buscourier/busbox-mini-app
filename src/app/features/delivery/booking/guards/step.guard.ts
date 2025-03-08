import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { bookingFeature } from '../store/feature';
import type { StepNumber } from '../types';

import type { Observable } from 'rxjs';

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
    departure: 2,
    destination: 3,
    review: 4,
  };

  return pathToStep[path] || 1;
}
