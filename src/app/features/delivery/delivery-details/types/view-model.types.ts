import type { DeliveryRestrictions } from './delivery-restrictions.types';
import type { OptionsViewModel } from './options.types';
import type { OrdersViewModel } from './order.types';

export interface DeliveryDetailsViewModel {
  orders: OrdersViewModel;
  options: OptionsViewModel;
  restrictions: DeliveryRestrictions;
}
