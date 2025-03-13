import { inject } from '@angular/core';

import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { combineLatest, debounceTime } from 'rxjs';

import { DEBOUNCE_TIME } from '@core/constants';

import { DeliveryDetailsActions } from '@delivery/delivery-details/store/actions';
import { deliveryPointFeature } from '@delivery/delivery-point/store/feature';
import { pickupPointFeature } from '@delivery/pickup-point/store/feature';

// а нужен ли тут ofType и actions?
export const citySelectionEffects = {
  // resetOptionsOnCityChange: createEffect(
  //   (actions$ = inject(Actions)) => {
  //     return actions$.pipe(
  //       ofType(PickupPointActions.selectCity, DeliveryPointActions.selectCity),
  //       map(() => DeliveryDetailsActions.resetSettings()),
  //     );
  //   },
  //   { functional: true },
  // ),

  loadOptionsOnCitiesSelected: createEffect(
    (store = inject(Store)) => {
      return combineLatest([
        store.select(pickupPointFeature.selectSelectedCity),
        store.select(deliveryPointFeature.selectSelectedCity),
      ]).pipe(
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        map(([pickupCity, deliveryCity]) => {
          if (pickupCity?.id && deliveryCity?.id) {
            return DeliveryDetailsActions.loadOptions({
              pickupCityId: pickupCity.id,
              deliveryCityId: deliveryCity.id,
            });
          }

          return DeliveryDetailsActions.skipLoadOptions();
        }),
      );
    },
    { functional: true },
  ),
};
