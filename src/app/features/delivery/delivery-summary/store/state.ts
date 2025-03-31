import type { ApiError } from '@shared/types';

export interface DeliverySummaryState {
  totalAmount: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: ApiError | null;
}
