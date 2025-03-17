import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, filter, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEBOUNCE_TIME } from '@core/constants';
import { PersistenceService } from '@core/services';

import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

import { DeliveryPointActions } from '../actions';
import { deliveryPointFeature } from '../feature';

export const persistenceEffects = {
  saveState: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      persistenceService = inject(PersistenceService),
    ) => {
      return actions$.pipe(
        ofType(
          DeliveryPointActions.setActiveTabId,
          DeliveryPointActions.selectCity,
          DeliveryPointActions.selectOffice,
          DeliveryPointActions.updateCourierDetails,
          DeliveryPointActions.setBusPickup,
          DeliveryPointActions.resetOffice,
          DeliveryPointActions.resetCourierDetails,
        ),
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        withLatestFrom(
          store.select(deliveryPointFeature.selectActiveTabId),
          store.select(deliveryPointFeature.selectSelectedCity),
          store.select(deliveryPointFeature.selectSelectedOffice),
          store.select(deliveryPointFeature.selectCourierDetails),
          store.select(deliveryPointFeature.selectBusPickup),
          store.select(deliveryPointFeature.selectFormState),
        ),
        filter(([, , , , , , formState]) => formState.valid),
        map(([, activeTabId, city, office, courierPoint, busPickup]) => ({
          activeTabId,
          cities: {
            selected: city,
          },
          offices: {
            selected: office,
          },
          courierPoint,
          busPickup,
        })),
        tap((state) =>
          persistenceService.save<DeliveryStorageKey, DeliveryStorageSchema>(
            'deliveryPoint',
            state,
          ),
        ),
      );
    },
    { functional: true, dispatch: false },
  ),
  removeState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.resetState),
        map(({ keepCity }) => {
          if (!keepCity) {
            return persistenceService.remove<DeliveryStorageKey, DeliveryStorageSchema>(
              'deliveryPoint',
            );
          }
        }),
      );
    },
    { functional: true, dispatch: false },
  ),
};
