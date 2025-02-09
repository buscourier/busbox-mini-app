import { inject } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { deliveryPointFeature } from '@features/delivery/delivery-point/store';
import { pickupPointFeature } from '@features/delivery/pickup-point/store';

import { CargoRestrictionsService } from '../../services';

import { DeliveryDetailsActions } from '../actions';

export const restrictionsEffects = {
  setRestrictions: createEffect(
    (store = inject(Store), restrictionsService = inject(CargoRestrictionsService)) => {
      return combineLatest([
        store.select(deliveryPointFeature.selectSelectedCity),
        store.select(pickupPointFeature.selectIsOfficeLimited),
        store.select(deliveryPointFeature.selectIsOfficeLimited),
        store.select(pickupPointFeature.selectIsCourierTabActive),
        store.select(deliveryPointFeature.selectIsCourierTabActive),
      ]).pipe(
        map(
          ([
            endCity,
            isStartPointOfficeLimited,
            isEndPointOfficeLimited,
            isStartPointCourierTabActive,
            isEndPointCourierTabActive,
          ]) =>
            restrictionsService.getRestrictions({
              endCity,
              isStartPointOfficeLimited,
              isEndPointOfficeLimited,
              isStartPointCourierTabActive,
              isEndPointCourierTabActive,
            }),
        ),
        map((restrictions) => DeliveryDetailsActions.setRestrictions({ restrictions })),
      );
    },
    { functional: true },
  ),
};
