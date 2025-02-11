import { inject } from '@angular/core';

import { combineLatest, debounceTime, filter, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { createEffect } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { DEBOUNCE_TIME } from '@core/constants';

import { ApiError } from '@shared/types';

import { deliveryDetailsFeature } from '../../../delivery-details/store/feature';
import { deliveryPointFeature } from '../../../delivery-point/store';
import { DeliveryPointTabType } from '../../../delivery-point/types';
import { pickupPointFeature } from '../../../pickup-point/store';
import { PickupPointTabType } from '../../../pickup-point/types';
import { OrderSummaryService } from '../../services/order-summary.service';

import { OrderSummaryActions } from '../actions';

export const calculationEffects = {
  setLoading: createEffect(
    (store = inject(Store)) => {
      return combineLatest([
        store.select(pickupPointFeature.selectSelectedCity),
        store.select(deliveryPointFeature.selectSelectedCity),
        store.select(deliveryDetailsFeature.selectAll),
        store.select(deliveryDetailsFeature.selectIsAllOrdersValid),
        store.select(pickupPointFeature.selectActiveTab),
        store.select(deliveryPointFeature.selectActiveTab),
      ]).pipe(map(() => OrderSummaryActions.loadTotalAmount()));
    },
    { functional: true },
  ),

  calculateTotal: createEffect(
    (store = inject(Store), orderSummaryService = inject(OrderSummaryService)) => {
      return combineLatest([
        store.select(pickupPointFeature.selectSelectedCity),
        store.select(deliveryPointFeature.selectSelectedCity),
        store.select(deliveryDetailsFeature.selectAll),
        store.select(deliveryDetailsFeature.selectIsAllOrdersValid),
        store.select(pickupPointFeature.selectActiveTab),
        store.select(deliveryPointFeature.selectActiveTab),
      ]).pipe(
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        filter(
          ([pickupCity, deliveryCity, orders, isAllOrdersValid]) =>
            !!pickupCity?.id && !!deliveryCity?.id && orders.length > 0 && isAllOrdersValid,
        ),
        switchMap(
          ([pickupCity, deliveryCity, orders, , pickupPointActiveTab, deliveryPointActiveTab]) => {
            const pickupPointCourierId =
              pickupPointActiveTab?.id === PickupPointTabType.COURIER ? '1' : null;

            const deliveryPointCourierId =
              deliveryPointActiveTab?.id === DeliveryPointTabType.COURIER ? '2' : null;

            return orderSummaryService
              .calculateTotalAmount({
                pickupCityId: pickupCity?.id || null,
                deliveryCityId: deliveryCity?.id || null,
                orders,
                pickupPointCourierId,
                deliveryPointCourierId,
              })
              .pipe(
                mapResponse({
                  next: ({ price }) =>
                    OrderSummaryActions.loadTotalAmountSuccess({ totalAmount: price }),
                  error: (error: ApiError) => OrderSummaryActions.loadTotalAmountFailure({ error }),
                }),
              );
          },
        ),
      );
    },
    { functional: true },
  ),
};
