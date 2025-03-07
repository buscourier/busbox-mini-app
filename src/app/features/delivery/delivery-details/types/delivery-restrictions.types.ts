import { CargoItemRestrictions } from './cargo-restrictions.types';
import { ParcelItemLimits, ParcelsLimits } from './parcel-limits.types';

export interface DeliveryRestrictions {
  autoParts: CargoItemRestrictions | null;
  otherCargo: CargoItemRestrictions | null;
  parcels: ParcelsLimits;
  parcelItem: ParcelItemLimits;
}
