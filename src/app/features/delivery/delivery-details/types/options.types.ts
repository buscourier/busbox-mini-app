import type { ApiError, LoadingStatus } from '@shared/types';

import type { Cargo } from './cargo.types';
import type { DeliveryOptions } from './delivery-options.types';
import type { Service } from './service.types';

export interface OptionsState {
  status: LoadingStatus;
  data: DeliveryOptions | null;
  error: ApiError | null;
}

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
