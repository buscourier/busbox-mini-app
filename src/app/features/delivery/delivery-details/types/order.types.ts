import { AdditionalServicesData } from './additional-services.types';
import { AutoPartsData } from './auto-parts.types';
import { CargoType } from './cargo.types';
import { DocumentsData } from './documents.types';
import { OtherCargoData } from './other-cargo.types';
import { PackagingData } from './packaging.types';
import { Parcels } from './parcels.types';

export interface OrderValidationState {
  documents?: boolean;
  parcels?: boolean;
  autoParts?: boolean;
  otherCargo?: boolean;
  packaging?: boolean;
  additionalServices?: boolean;
}

export interface Order {
  id: string;
  cargoType: CargoType | null;
  documents: DocumentsData | null;
  parcels: Parcels | null;
  autoParts: AutoPartsData | null;
  otherCargo: OtherCargoData | null;
  packaging: PackagingData | null;
  additionalServices: AdditionalServicesData | null;
  validation: OrderValidationState;
}

export interface EnhancedOrder extends Order {
  number: number;
  isActive: boolean;
  isActiveInvalid: boolean;
  isDisabled: boolean;
}

export interface OrdersViewModel {
  items: EnhancedOrder[];
  active: Order | null;
  isActiveValid: boolean;
  isAllValid: boolean;
}
