import type { CargoItemRestrictions } from './cargo-restrictions.types';
import type { ParcelItemLimits, ParcelsLimits } from './parcels.types';

export interface DeliveryRestrictions {
  autoParts: CargoItemRestrictions | null;
  otherCargo: CargoItemRestrictions | null;
  parcels: ParcelsLimits;
  parcelItem: ParcelItemLimits;
}
