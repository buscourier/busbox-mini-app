import type { ApiError } from '@shared/types';

import type { ActiveOrderDetails } from '@delivery/delivery-details/types';

import type { DeliveryDirection } from './delivery-direction.types';
import type { DeliveryMethods } from './delivery-methods.types';

export interface OrderSummaryBaseViewModel {
  isLoading: boolean;
  isLoaded: boolean;
  error: ApiError | null;
  totalAmount: number;
}

export interface OrderSummaryViewModel extends OrderSummaryBaseViewModel {
  direction: DeliveryDirection | null;
  methods: DeliveryMethods;
  orderDetails: ActiveOrderDetails;
}
