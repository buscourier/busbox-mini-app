import { StoredPickupPointState } from '@features/delivery/common/components/pickup-point/types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  // deliveryPoint: StoredDeliveryPointState;
  // deliveryOptions: StoredDeliveryOptionsState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
