import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { PersistenceService } from '@core/services';

import { BookingActions } from '@delivery/booking/store/actions'; //????
import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

import { PickupPointActions } from '../actions';

export const initializationEffects = {
  restoreState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(PickupPointActions.initState, BookingActions.init),
        map(() => {
          const restoredState = persistenceService.load<DeliveryStorageKey, DeliveryStorageSchema>(
            'pickupPoint',
          );
          return restoredState
            ? PickupPointActions.restoreState({
                restoredState: restoredState as DeliveryStorageSchema['pickupPoint'],
              })
            : PickupPointActions.initSkipped();
        }),
      );
    },
    { functional: true },
  ),

  initCitiesLoad: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.initState),
        map(() => PickupPointActions.loadCities()),
      );
    },
    { functional: true },
  ),

  // validateFormAfterStateRestore: createEffect(
  //   (actions$ = inject(Actions)) => {
  //     return actions$.pipe(
  //       ofType(PickupPointActions.restoreState),
  //       map(({ restoredState }) => {
  //         const isValid = !!(
  //           restoredState.cities?.selected &&
  //           (restoredState.offices?.selected || restoredState.courierDetails) &&
  //           restoredState.departureDate
  //         );
  //
  //         return PickupPointActions.setFormValidity({ isValid });
  //       }),
  //     );
  //   },
  //   { functional: true },
  // ),
};
