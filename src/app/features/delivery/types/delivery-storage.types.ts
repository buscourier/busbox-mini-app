import { StoredDeliveryPointState } from '@features/delivery/delivery-point/types/storage.types';
import { StoredPickupPointState } from '@features/delivery/pickup-point/types/storage.types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  deliveryPoint: StoredDeliveryPointState;
  // deliveryOptions: StoredDeliveryOptionsState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
