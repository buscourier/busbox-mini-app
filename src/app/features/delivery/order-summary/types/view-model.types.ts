import type { ApiError } from '@shared/types';

import type { ActiveOrderDetails } from '@delivery/delivery-details/types';

import type { OrderDelivery } from './order-delivery.types';
import type { OrderDirection } from './order-direction.types';

export interface OrderSummaryViewModel {
  orderDirection: OrderDirection | null;
  orderDelivery: OrderDelivery | null;
  orderDetails: ActiveOrderDetails;
  isLoading: boolean;
  isLoaded: boolean;
  totalAmount: number;
  error: ApiError | null;
}
