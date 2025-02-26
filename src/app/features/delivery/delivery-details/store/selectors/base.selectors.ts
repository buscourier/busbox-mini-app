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
  const selectSettingsLoading = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.settingsStatus === LoadingStatus.LOADING,
  );

  const selectSettingsLoaded = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.settingsStatus === LoadingStatus.LOADED,
  );

  const selectSettingsError = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.settingsStatus === LoadingStatus.ERROR,
  );

  const selectSettings = createSelector(
    selectDeliveryDetailsState,
    (state: DeliveryDetailsState) => state.settings,
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
    selectSettingsLoading,
    selectSettingsLoaded,
    selectSettingsError,
    selectSettings,
    selectActiveOrderId,
    selectRestrictions,
    selectError,
  };
};
