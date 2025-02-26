import {
  CargoTypesGroup,
  DeliveryRestrictions,
  DeliverySettings,
  EnhancedOrder,
  Order,
  Service,
} from '../../types';

export interface DeliveryDetailsViewModel {
  enhancedOrders: EnhancedOrder[];
  activeOrder: Order | null;
  isActiveOrderValid: boolean;
  isAllOrdersValid: boolean;
  cargoTypes: CargoTypesGroup;
  additionalServices: Service[];
  restrictions: DeliveryRestrictions;
  settingsLoading: boolean;
  settingsLoaded: boolean;
  settingsError: boolean;
  settings: DeliverySettings | null;
  error: string | null;
}
