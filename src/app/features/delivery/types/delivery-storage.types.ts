import { StoredBookingState } from '../booking/types/storage.types';
import { StoredDeliveryDetailsState } from '../delivery-details/types';
import { StoredDeliveryPointState } from '../delivery-point/types/storage.types';
import { StoredPickupPointState } from '../pickup-point/types/storage.types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  deliveryPoint: StoredDeliveryPointState;
  deliveryDetails: StoredDeliveryDetailsState;
  booking: StoredBookingState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
