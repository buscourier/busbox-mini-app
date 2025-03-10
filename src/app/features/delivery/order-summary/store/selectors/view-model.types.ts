import type { ApiError } from '@shared/types';

import type { ActiveOrderDetails } from '@delivery/delivery-details/types';
import type { OrderDelivery, OrderDirection } from '@delivery/order-summary/types';

export interface OrderSummaryViewModel {
  orderDirection: OrderDirection | null;
  orderDelivery: OrderDelivery | null;
  orderDetails: ActiveOrderDetails;
  isLoading: boolean;
  isLoaded: boolean;
  totalAmount: number;
  error: ApiError | null;
}
