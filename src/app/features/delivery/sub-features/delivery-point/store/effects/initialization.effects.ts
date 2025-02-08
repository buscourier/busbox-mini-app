import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PersistenceService } from '@core/services';

import { DeliveryStorageKey, DeliveryStorageSchema } from '@features/delivery/types';

import { DeliveryPointActions } from '../actions';

export const initializationEffects = {
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
