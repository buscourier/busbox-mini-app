import { createSelector } from '@ngrx/store';

import type { DeliverySummaryBaseViewModel } from '../../types';

import type { BaseSelectors } from './base-selectors.types';

export const createViewModelSelector = (baseSelectors: BaseSelectors) => ({
  selectBaseViewModel: createSelector(
    baseSelectors.selectIsLoading,
    baseSelectors.selectIsLoaded,
    baseSelectors.selectError,
    baseSelectors.selectTotalAmount,
    (isLoading, isLoaded, error, totalAmount): DeliverySummaryBaseViewModel => ({
      isLoading,
      isLoaded,
      error,
      totalAmount,
    }),
  ),
});
