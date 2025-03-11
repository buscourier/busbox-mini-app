import type { StoredBookingState } from '@delivery/booking/types';
import type { StoredDeliveryDetailsState } from '@delivery/delivery-details/types';
import type { StoredDeliveryPointState } from '@delivery/delivery-point/types';
import type { StoredPickupPointState } from '@delivery/pickup-point/types';

export interface DeliveryStorageSchema {
  pickupPoint: StoredPickupPointState;
  deliveryPoint: StoredDeliveryPointState;
  deliveryDetails: StoredDeliveryDetailsState;
  booking: StoredBookingState;
}

export type DeliveryStorageKey = keyof DeliveryStorageSchema;
