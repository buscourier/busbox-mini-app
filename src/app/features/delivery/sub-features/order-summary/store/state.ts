import { ApiError } from '@shared/types';

export interface OrderSummaryState {
  totalAmount: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: ApiError | null;
}
