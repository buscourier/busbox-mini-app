import { StoredBookingState } from '@features/delivery/booking/types/storage.types';
import { StoredDeliveryDetailsState } from '@features/delivery/delivery-details/types';
import { StoredDeliveryPointState } from '@features/delivery/delivery-point/types/storage.types';
import { StoredPickupPointState } from '@features/delivery/pickup-point/types/storage.types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  deliveryPoint: StoredDeliveryPointState;
  deliveryDetails: StoredDeliveryDetailsState;
  booking: StoredBookingState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
