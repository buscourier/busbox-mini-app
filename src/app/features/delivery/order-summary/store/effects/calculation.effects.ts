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
import { pickupPointFeature } from '../../../pickup-point/store';
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
