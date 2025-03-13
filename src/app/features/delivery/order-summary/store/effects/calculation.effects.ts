import { inject } from '@angular/core';

import { createEffect } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { combineLatest, debounceTime, filter, switchMap } from 'rxjs';

import { DEBOUNCE_TIME } from '@core/constants';

import type { ApiError } from '@shared/types';

import { deliveryDetailsFeature } from '@delivery/delivery-details/store/feature';
import { deliveryPointFeature } from '@delivery/delivery-point/store/feature';
import { OrderSummaryService } from '@delivery/order-summary/services';
import { OrderSummaryActions } from '@delivery/order-summary/store/actions';
import { pickupPointFeature } from '@delivery/pickup-point/store/feature';

export const calculationEffects = {
  setLoading: createEffect(
    (store = inject(Store)) => {
      return combineLatest([
        store.select(pickupPointFeature.selectSelectedCity),
        store.select(deliveryPointFeature.selectSelectedCity),
        store.select(deliveryDetailsFeature.selectAll),
        store.select(deliveryDetailsFeature.selectIsAllOrdersValid),
        store.select(pickupPointFeature.selectCourier),
        store.select(deliveryPointFeature.selectCourier),
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
        store.select(pickupPointFeature.selectCourier),
        store.select(deliveryPointFeature.selectCourier),
      ]).pipe(
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        filter(
          ([pickupCity, deliveryCity, orders, isAllOrdersValid]) =>
            !!pickupCity?.id && !!deliveryCity?.id && orders.length > 0 && isAllOrdersValid,
        ),
        switchMap(([pickupCity, deliveryCity, orders, , pickupCourier, deliveryCourier]) => {
          return orderSummaryService
            .calculateTotalAmount({
              pickupCityId: pickupCity?.id || null,
              deliveryCityId: deliveryCity?.id || null,
              orders,
              pickupCourier,
              deliveryCourier,
            })
            .pipe(
              mapResponse({
                next: ({ price }) =>
                  OrderSummaryActions.loadTotalAmountSuccess({ totalAmount: price }),
                error: (error: ApiError) => OrderSummaryActions.loadTotalAmountFailure({ error }),
              }),
            );
        }),
      );
    },
    { functional: true },
  ),
};
