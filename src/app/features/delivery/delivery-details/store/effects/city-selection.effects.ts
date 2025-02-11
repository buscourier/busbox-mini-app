import { inject } from '@angular/core';

import { combineLatest, debounceTime } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { DEBOUNCE_TIME } from '@core/constants';

import { DeliveryPointActions, deliveryPointFeature } from '../../../delivery-point/store';
import { PickupPointActions, pickupPointFeature } from '../../../pickup-point/store';

import { DeliveryDetailsActions } from '../actions';

// а нужен ли тут ofType и actions?
export const citySelectionEffects = {
  resetSettingsOnCityChange: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.selectCity, DeliveryPointActions.selectCity),
        map(() => DeliveryDetailsActions.resetSettings()),
      );
    },
    { functional: true },
  ),

  loadSettingsOnCitiesSelected: createEffect(
    (store = inject(Store)) => {
      return combineLatest([
        store.select(pickupPointFeature.selectSelectedCity),
        store.select(deliveryPointFeature.selectSelectedCity),
      ]).pipe(
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        map(([pickupCity, deliveryCity]) => {
          if (pickupCity?.id && deliveryCity?.id) {
            return DeliveryDetailsActions.loadSettings({
              pickupCityId: pickupCity.id,
              deliveryCityId: deliveryCity.id,
            });
          }

          return DeliveryDetailsActions.skipLoadSettings();
        }),
      );
    },
    { functional: true },
  ),
};
