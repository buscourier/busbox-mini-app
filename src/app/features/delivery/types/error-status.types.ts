import { ApiError } from '@shared/types';

export interface ErrorStatus {
  citiesError: ApiError | null;
  officesError: ApiError | null;
  hasAnyError: boolean;
}
