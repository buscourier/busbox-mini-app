import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { PersistenceService } from '@core/services';

import { initPickupPoint } from '@delivery/pickup-point';
import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

import { DeliveryPointActions } from '../actions';

export const initializationEffects = {
  initState: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(initPickupPoint),
        map(() => DeliveryPointActions.initState()),
      );
    },
    { functional: true },
  ),
  loadState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.initState),
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
