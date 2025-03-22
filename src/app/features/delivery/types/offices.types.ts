import type { LoadingStatus, ApiError, Office } from '@shared/types';

export interface OfficesState {
  items: Office[];
  status: LoadingStatus;
  error: ApiError | null;
  selected: Office | null;
}

export interface OfficesViewModel {
  items: Office[];
  isLoading: boolean;
  isLoaded: boolean;
  error: ApiError | null;
  selected: Office | null;
}
