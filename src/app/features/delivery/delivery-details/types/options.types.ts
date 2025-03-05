import { ApiError } from '@shared/types';

import { Cargo } from './cargo.types';
import { Service } from './service.types';

export interface OptionsViewModel {
  isLoading: boolean;
  isLoaded: boolean;
  error: ApiError | null;
  cargoTypes: Cargo[];
  autoParts: Cargo[];
  otherCargos: Cargo[];
  additionalServices: Service[];
  packaging: Service[];
}
