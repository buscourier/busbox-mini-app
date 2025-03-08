import type { LoadingStatus } from '@shared/types';
import type { ApiError } from '@shared/types/api-error.types';
import type { Office } from '@shared/types/office.types';

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
