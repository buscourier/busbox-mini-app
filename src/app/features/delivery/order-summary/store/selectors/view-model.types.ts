import { ApiError } from '@shared/types';

import { ActiveOrderDetails } from '../../../delivery-details/types';
import { OrderDelivery, OrderDirection } from '../../types';

export interface OrderSummaryViewModel {
  orderDirection: OrderDirection | null;
  orderDelivery: OrderDelivery | null;
  orderDetails: ActiveOrderDetails;
  isLoading: boolean;
  isLoaded: boolean;
  totalAmount: number;
  error: ApiError | null;
}
