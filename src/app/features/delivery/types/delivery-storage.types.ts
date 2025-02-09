import { StoredDeliveryPointState } from '@features/delivery/delivery-point/types/storage.types';
import { StoredPickupPointState } from '@features/delivery/pickup-point/types/storage.types';

import { StoredDeliveryDetailsState } from '../sub-features/delivery-details/types/storage.types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  deliveryPoint: StoredDeliveryPointState;
  deliveryDetails: StoredDeliveryDetailsState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
