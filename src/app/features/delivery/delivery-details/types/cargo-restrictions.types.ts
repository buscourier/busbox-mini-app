import { DeliveryCity } from '@shared/types';

import { ParcelLimits, ParcelsLimits } from './parcel-limits.types';

export interface GetCargoRestrictionsParams {
  deliveryCity: DeliveryCity | null;
  isPickupOfficeLimited: boolean;
  isDeliveryOfficeLimited: boolean;
  isPickupCourierSelected: boolean;
  isDeliveryCourierSelected: boolean;
}

export interface CargoPointRestriction {
  restricted: boolean;
  message: string;
}

export interface CargoItemRestrictions {
  pickupOffice: CargoPointRestriction | null;
  deliveryOffice: CargoPointRestriction | null;
  pickupCourier: CargoPointRestriction | null;
  deliveryCourier: CargoPointRestriction | null;
}

export interface CargoRestrictions {
  autoParts: CargoItemRestrictions | null;
  otherCargo: CargoItemRestrictions | null;
  parcels: ParcelsLimits;
  parcel: ParcelLimits;
}
