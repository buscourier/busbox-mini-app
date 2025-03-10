import { createSelector } from '@ngrx/store';

import { deliveryDetailsFeature } from '@delivery/delivery-details';
import { deliveryPointFeature } from '@delivery/delivery-point';
import { orderSummaryFeature } from '@delivery/order-summary/store';
import type { OrderDelivery, OrderDirection } from '@delivery/order-summary/types';
import { pickupPointFeature } from '@delivery/pickup-point';

import type { OrderSummaryViewModel } from './view-model.types';

const selectOrderDirection = createSelector(
  pickupPointFeature.selectSelectedCity,
  deliveryPointFeature.selectSelectedCity,
  (pickupCity, deliveryCity): OrderDirection | null =>
    pickupCity && deliveryCity ? { from: pickupCity.name, to: deliveryCity.name } : null,
);

const selectOrderDelivery = createSelector(
  pickupPointFeature.selectActiveTab,
  deliveryPointFeature.selectActiveTab,
  (pickupPoint, deliveryPoint): OrderDelivery | null =>
    pickupPoint && deliveryPoint
      ? {
          pickup: pickupPoint.name,
          delivery: deliveryPoint.name,
        }
      : null,
);

export const selectOrderSummaryViewModel = createSelector(
  selectOrderDirection,
  selectOrderDelivery,
  deliveryDetailsFeature.selectActiveOrderDetails,
  orderSummaryFeature.selectIsLoading,
  orderSummaryFeature.selectIsLoaded,
  orderSummaryFeature.selectError,
  orderSummaryFeature.selectTotalAmount,
  (
    orderDirection,
    orderDelivery,
    orderDetails,
    isLoading,
    isLoaded,
    error,
    totalAmount,
  ): OrderSummaryViewModel => ({
    orderDirection,
    orderDelivery,
    orderDetails,
    isLoading,
    isLoaded,
    error,
    totalAmount,
  }),
);
