import { createSelector } from '@ngrx/store';

import { deliveryDetailsFeature } from '../../../delivery-details/store/feature';
import { deliveryPointFeature } from '../../../delivery-point/store';
import { pickupPointFeature } from '../../../pickup-point/store';
import type { OrderDelivery, OrderDirection } from '../../types';

import { orderSummaryFeature } from '../feature';
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
