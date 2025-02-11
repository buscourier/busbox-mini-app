import { CargoItemRestrictions } from './cargo-restrictions.types';
import { ParcelLimits, ParcelsLimits } from './parcel-limits.types';

export interface DeliveryRestrictions {
  autoParts: CargoItemRestrictions | null;
  otherCargo: CargoItemRestrictions | null;
  parcels: ParcelsLimits;
  parcel: ParcelLimits;
}
