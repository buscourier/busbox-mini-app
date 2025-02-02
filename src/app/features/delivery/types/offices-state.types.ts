import { Office } from '@shared/types/office.types';
import { ApiError } from '@shared/types/api-error.types';

export interface OfficesState {
  items: Office[];
  isLoading: boolean;
  error: ApiError | null;
  selected: Office | null;
}
