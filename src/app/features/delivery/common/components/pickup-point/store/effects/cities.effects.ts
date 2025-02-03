import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';
import { switchMap } from 'rxjs';
import { PickupPointActions } from '@features/delivery/common/components/pickup-point/store/actions';
import { ApiError, PickupCity } from '@shared/types';
import { DeliveryService } from '@features/delivery/services';

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
