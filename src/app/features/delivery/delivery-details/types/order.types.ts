import { AdditionalServices } from './additional-services.types';
import { AutoParts } from './auto-parts.types';
import { CargoType } from './cargo.types';
import { Documents } from './documents.types';
import { OtherCargo } from './other-cargo.types';
import { Packaging } from './packaging.types';
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
  documents: Documents | null;
  parcels: Parcels | null;
  autoParts: AutoParts | null;
  otherCargo: OtherCargo | null;
  packaging: Packaging | null;
  additionalServices: AdditionalServices | null;
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
