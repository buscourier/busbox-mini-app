import type { StoredBookingState } from '../booking/types/storage.types';
import type { StoredDeliveryDetailsState } from '../delivery-details/types';
import type { StoredDeliveryPointState } from '../delivery-point/types/storage.types';
import type { StoredPickupPointState } from '../pickup-point/types/storage.types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  deliveryPoint: StoredDeliveryPointState;
  deliveryDetails: StoredDeliveryDetailsState;
  booking: StoredBookingState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
