import { createSelector, MemoizedSelector } from '@ngrx/store';

import { PickupPointState } from '../state';
import { BaseSelectors } from './base-selectors.types';

type PickupPointStateSelector = MemoizedSelector<object, PickupPointState>;

export const createBaseSelectors = (
  selectPickupPointState: PickupPointStateSelector,
): BaseSelectors => ({
  selectCities: createSelector(selectPickupPointState, (state) => state.cities.items),
  selectIsCitiesLoading: createSelector(selectPickupPointState, (state) => state.cities.isLoading),
  selectCitiesError: createSelector(selectPickupPointState, (state) => state.cities.error),
  selectSelectedCity: createSelector(selectPickupPointState, (state) => state.cities.selected),

  selectOffices: createSelector(selectPickupPointState, (state) => state.offices.items),
  selectIsOfficesLoading: createSelector(
    selectPickupPointState,
    (state) => state.offices.isLoading,
  ),
  selectOfficesError: createSelector(selectPickupPointState, (state) => state.offices.error),
  selectSelectedOffice: createSelector(selectPickupPointState, (state) => state.offices.selected),

  selectActiveTabId: createSelector(selectPickupPointState, (state) => state.activeTabId),

  selectCourierDetails: createSelector(selectPickupPointState, (state) => state.courierDetails),
  selectDepartureDate: createSelector(selectPickupPointState, (state) => state.departureDate),
  selectFormState: createSelector(selectPickupPointState, (state) => state.form),
});
