import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { PersistenceService } from '@core/services';

import { initBooking } from '@delivery/booking';
import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

import { DeliveryPointActions } from '../actions';

export const initializationEffects = {
  loadState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.initState, initBooking),
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
