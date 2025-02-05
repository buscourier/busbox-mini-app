import { StoredPickupPointState } from '@delivery/foundation/pickup-point/types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  // deliveryPoint: StoredDeliveryPointState;
  // deliveryOptions: StoredDeliveryOptionsState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
