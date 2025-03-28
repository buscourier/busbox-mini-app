import type { AdditionalServices } from './additional-services.types';
import type { AutoParts } from './auto-parts.types';
import type { CargoType } from './cargo.types';
import type { Documents } from './documents.types';
import type { Packaging, Parcels } from './index';
import type { OtherCargo } from './other-cargo.types';

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
