import {
  CargoTypesGroup,
  DeliveryRestrictions,
  DeliverySettings,
  EnhancedOrder,
  Order,
  Service,
} from '@features/delivery/types';

export interface DeliveryDetailsViewModel {
  enhancedOrders: EnhancedOrder[];
  activeOrder: Order | null;
  isActiveOrderValid: boolean;
  isAllOrdersValid: boolean;
  cargoTypes: CargoTypesGroup;
  additionalServices: Service[];
  restrictions: DeliveryRestrictions;
  isLoading: boolean;
  isLoaded: boolean;
  settings: DeliverySettings | null;
  error: string | null;
}
