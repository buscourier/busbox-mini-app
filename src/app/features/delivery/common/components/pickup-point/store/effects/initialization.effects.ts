import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { PickupPointActions } from '@features/delivery/common/components/pickup-point/store/actions';
import { DeliveryStorageKey, DeliveryStorageSchema } from '@features/delivery/types';
import { PersistenceService } from '@core/services';

export const initializationEffects = {
  restoreState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(PickupPointActions.initState),
        map(() => {
          const restoredState = persistenceService.load<DeliveryStorageKey, DeliveryStorageSchema>(
            'pickupPoint',
          );
          return restoredState
            ? PickupPointActions.restoreState({ restoredState })
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
