import { AdditionalServicesData } from './additional-services.types';
import { CargoDetails, CargoType } from './cargo.types';
import { PackagingDetails } from './packaging.types';

/**
 * UI representation interfaces for order details.
 * Contains structures optimized for displaying order information
 * in the user interface.
 * Used specifically for data display in app-order-summary component.
 */
export interface ActiveOrderDetails {
  cargoType: CargoType | null;
  documents: CargoDetails | null;
  parcels: CargoDetails | null;
  autoParts: CargoDetails | null;
  otherCargo: CargoDetails | null;
  packaging: { items: PackagingDetails[] } | null;
  additionalServices: AdditionalServicesData | null;
}
