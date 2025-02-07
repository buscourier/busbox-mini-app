import { ApiError } from '@shared/types/api-error.types';
import { Office } from '@shared/types/office.types';

export interface OfficesState {
  items: Office[];
  isLoading: boolean;
  error: ApiError | null;
  selected: Office | null;
}
