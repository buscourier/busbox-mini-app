import { inject } from '@angular/core';

import { switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';

import type { ApiError, PickupCity } from '@shared/types';

import { PickupPointActions } from '@delivery/pickup-point/store';
import { DeliveryService } from '@delivery/services';

export const citiesEffects = {
  loadCities: createEffect(
    (actions$ = inject(Actions), deliveryService = inject(DeliveryService)) => {
      return actions$.pipe(
        ofType(PickupPointActions.loadCities),
        switchMap(() =>
          deliveryService.getPickupCities().pipe(
            mapResponse({
              next: (cities: PickupCity[]) => PickupPointActions.loadCitiesSuccess({ cities }),
              error: (error: ApiError) => PickupPointActions.loadCitiesFailure({ error }),
            }),
          ),
        ),
      );
    },
    { functional: true },
  ),
};
