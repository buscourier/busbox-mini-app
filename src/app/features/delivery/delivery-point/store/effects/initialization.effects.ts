import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { PersistenceService } from '@core/services';

import { BookingActions } from '@delivery/booking/store/actions';
import { DeliveryPointActions } from '@delivery/delivery-point/store';
import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

export const initializationEffects = {
  loadState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.initState, BookingActions.init),
        map(() => {
          const restoredState = persistenceService.load<DeliveryStorageKey, DeliveryStorageSchema>(
            'deliveryPoint',
          );

          return restoredState
            ? DeliveryPointActions.restoreState({
                restoredState: restoredState as DeliveryStorageSchema['deliveryPoint'],
              })
            : DeliveryPointActions.initSkipped();
        }),
      );
    },
    { functional: true },
  ),
};
