import { createSelector, MemoizedSelector } from '@ngrx/store';

import { DeliveryPointState } from '../state';
import { BaseSelectors } from './base-selectors.types';

type DeliveryPointStateSelector = MemoizedSelector<object, DeliveryPointState>;

export const createBaseSelectors = (
  selectDeliveryPointState: DeliveryPointStateSelector,
): BaseSelectors => ({
  // Cities
  selectCities: createSelector(selectDeliveryPointState, (state) => state.cities.items),
  selectIsCitiesLoading: createSelector(
    selectDeliveryPointState,
    (state) => state.cities.isLoading,
  ),
  selectCitiesError: createSelector(selectDeliveryPointState, (state) => state.cities.error),
  selectSelectedCity: createSelector(selectDeliveryPointState, (state) => state.cities.selected),

  // Offices
  selectOffices: createSelector(selectDeliveryPointState, (state) => state.offices.items),
  selectIsOfficesLoading: createSelector(
    selectDeliveryPointState,
    (state) => state.offices.isLoading,
  ),
  selectOfficesError: createSelector(selectDeliveryPointState, (state) => state.offices.error),
  selectSelectedOffice: createSelector(selectDeliveryPointState, (state) => state.offices.selected),

  // Tabs
  selectActiveTabId: createSelector(selectDeliveryPointState, (state) => state.activeTabId),

  // Additional details
  selectCourierDetails: createSelector(selectDeliveryPointState, (state) => state.courierDetails),
  selectBusPickup: createSelector(selectDeliveryPointState, (state) => state.busPickup),
  selectFormState: createSelector(selectDeliveryPointState, (state) => state.form),
});
