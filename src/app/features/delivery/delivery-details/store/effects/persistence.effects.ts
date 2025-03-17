import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, filter, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEBOUNCE_TIME } from '@core/constants';
import { PersistenceService } from '@core/services';

import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

import type { StoredDeliveryDetailsState } from '../../types';

import { DeliveryDetailsActions, OrderActions } from '../actions';
import { deliveryDetailsFeature } from '../feature';

export const persistenceEffects = {
  saveState: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      persistenceService = inject(PersistenceService),
    ) => {
      return actions$.pipe(
        ofType(
          OrderActions.setActive,
          OrderActions.setCargoType,
          OrderActions.updateData,
          OrderActions.updateValidation,
          OrderActions.add,
          OrderActions.remove,
        ),
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        withLatestFrom(
          store.select(deliveryDetailsFeature.selectActiveOrderId),
          store.select(deliveryDetailsFeature.selectEntities),
          store.select(deliveryDetailsFeature.selectIsAllOrdersValid),
        ),
        filter(([, , , isAllOrdersValid]) => isAllOrdersValid),
        map(([, activeOrderId, entities]) => ({
          activeOrderId,
          entities,
        })),
        tap((state) => {
          persistenceService.save<DeliveryStorageKey, DeliveryStorageSchema>(
            'deliveryDetails',
            state,
          );
        }),
      );
    },
    { functional: true, dispatch: false },
  ),

  removeState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(DeliveryDetailsActions.resetOptions),
        tap(() =>
          persistenceService.remove<DeliveryStorageKey, DeliveryStorageSchema>('deliveryDetails'),
        ),
      );
    },
    { functional: true, dispatch: false },
  ),

  restoreState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(DeliveryDetailsActions.loadOptionsSuccess),
        map(() => {
          const restoredState = persistenceService.load<DeliveryStorageKey, DeliveryStorageSchema>(
            'deliveryDetails',
          ) as StoredDeliveryDetailsState;

          if (!restoredState || !Object.keys(restoredState.entities).length) {
            return OrderActions.add();
          }

          return DeliveryDetailsActions.restoreState({ restoredState });
        }),
      );
    },
    { functional: true },
  ),
};
