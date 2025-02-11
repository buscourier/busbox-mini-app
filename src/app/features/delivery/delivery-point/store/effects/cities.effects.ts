import { inject } from '@angular/core';

import { filter, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';

import { ApiError, DeliveryCity } from '@shared/types';

import { DeliveryService } from '@features/delivery/services';

import { PickupPointActions } from '../../../pickup-point/store';

import { DeliveryPointActions } from '../actions';

export const citiesEffects = {
  initCitiesLoad: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.selectCity),
        map(({ city }) => DeliveryPointActions.loadCities({ startCityId: city.id })),
      );
    },
    { functional: true },
  ),
  initCitiesLoadOnPickupPointRestore: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.restoreState),
        filter(({ restoredState }) => !!restoredState.cities?.selected),
        map(({ restoredState }) =>
          DeliveryPointActions.loadCities({ startCityId: restoredState.cities.selected!.id }),
        ),
      );
    },
    { functional: true },
  ),
  loadDeliveryCities: createEffect(
    (actions$ = inject(Actions), deliveryService = inject(DeliveryService)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.loadCities),
        switchMap(({ startCityId }) =>
          deliveryService.getDeliveryCities(startCityId).pipe(
            mapResponse({
              next: (cities: DeliveryCity[]) => DeliveryPointActions.loadCitiesSuccess({ cities }),
              error: (error: ApiError) => DeliveryPointActions.loadCitiesFailure({ error }),
            }),
          ),
        ),
      );
    },
    { functional: true },
  ),
};
