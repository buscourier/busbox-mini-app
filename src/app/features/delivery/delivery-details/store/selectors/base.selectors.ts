import { EntityAdapter } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import { LoadingStatus } from '@shared/types';

import { Order } from '../../types';

import { DeliveryDetailsState } from '../state';
import { BaseSelectors } from './base-selectors.types';

type DeliveryDetailsStateSelector = MemoizedSelector<object, DeliveryDetailsState>;

export const createBaseSelectors = (
  selectDeliveryDetailsState: DeliveryDetailsStateSelector,
  adapter: EntityAdapter<Order>,
): BaseSelectors => {
  const entitySelectors = adapter.getSelectors(selectDeliveryDetailsState);

  // Basic entity selectors
  const selectAll = entitySelectors.selectAll;
  const selectEntities = entitySelectors.selectEntities;
  const selectIds = entitySelectors.selectIds;
  const selectTotal = entitySelectors.selectTotal;

  // State selectors
  const selectIsOptionsLoading = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.optionsStatus === LoadingStatus.LOADING,
  );

  const selectIsOptionsLoaded = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.optionsStatus === LoadingStatus.LOADED,
  );

  const selectOptionsError = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.optionsStatus === LoadingStatus.ERROR,
  );

  const selectOptions = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.options,
  );

  const selectActiveOrderId = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.activeOrderId,
  );

  const selectError = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.error,
  );

  const selectRestrictions = createSelector(
    selectDeliveryDetailsState,
    (state) => state.restrictions,
  );

  return {
    // Entity selectors
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,

    // State selectors
    selectIsOptionsLoading,
    selectIsOptionsLoaded,
    selectOptionsError,
    selectOptions,
    selectActiveOrderId,
    selectRestrictions,
    selectError,
  };
};
