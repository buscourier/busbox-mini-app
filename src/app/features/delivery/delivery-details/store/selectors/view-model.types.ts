import { DeliveryRestrictions, OptionsViewModel, OrdersViewModel } from '../../types';

export interface DeliveryDetailsViewModel {
  orders: OrdersViewModel;
  options: OptionsViewModel;
  restrictions: DeliveryRestrictions;
}
