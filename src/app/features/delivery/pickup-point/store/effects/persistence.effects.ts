import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { debounceTime, filter, tap, withLatestFrom } from 'rxjs';

import { DEBOUNCE_TIME } from '@core/constants';
import { PersistenceService } from '@core/services';

import { PickupPointActions, pickupPointFeature } from '@delivery/pickup-point/store';
import type { DeliveryStorageKey, DeliveryStorageSchema } from '@delivery/types';

export const persistenceEffects = {
  saveState: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      persistenceService = inject(PersistenceService),
    ) => {
      return actions$.pipe(
        ofType(
          PickupPointActions.setActiveTabId,
          PickupPointActions.selectCity,
          PickupPointActions.selectOffice,
          PickupPointActions.updateCourierDetails,
          PickupPointActions.setDepartureDate,
          PickupPointActions.resetOffice,
          PickupPointActions.resetCourierDetails,
        ),
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        withLatestFrom(
          store.select(pickupPointFeature.selectActiveTabId),
          store.select(pickupPointFeature.selectSelectedCity),
          store.select(pickupPointFeature.selectSelectedOffice),
          store.select(pickupPointFeature.selectCourierDetails),
          store.select(pickupPointFeature.selectDepartureDate),
          store.select(pickupPointFeature.selectFormState),
        ),
        filter(([, , , , , , formState]) => formState.valid),
        map(([, activeTabId, city, office, courierDetails, departureDate]) => ({
          activeTabId,
          cities: { selected: city },
          offices: { selected: office },
          courierDetails,
          departureDate,
        })),
        tap((state) => {
          persistenceService.save<DeliveryStorageKey, DeliveryStorageSchema>('pickupPoint', state);
        }),
      );
    },
    { functional: true, dispatch: false },
  ),
  removeState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetState),
        map(({ keepCity }) => {
          if (!keepCity) {
            return persistenceService.remove<DeliveryStorageKey, DeliveryStorageSchema>(
              'pickupPoint',
            );
          }
        }),
      );
    },
    { functional: true, dispatch: false },
  ),
};
