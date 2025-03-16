import type { MemoizedSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

import { LoadingStatus } from '@shared/types';

import type { PickupPointState } from '../state';

import type { BaseSelectors } from './base-selectors.types';

type PickupPointStateSelector = MemoizedSelector<object, PickupPointState>;

export const createBaseSelectors = (
  selectPickupPointState: PickupPointStateSelector,
): BaseSelectors => {
  const selectCitiesState = createSelector(selectPickupPointState, (state) => state.cities);
  const selectOfficesState = createSelector(selectPickupPointState, (state) => state.offices);

  return {
    selectCities: createSelector(selectCitiesState, (cities) => cities.items),
    selectIsCitiesLoading: createSelector(
      selectCitiesState,
      (cities) => cities.status === LoadingStatus.LOADING,
    ),
    selectIsCitiesLoaded: createSelector(
      selectCitiesState,
      (cities) => cities.status === LoadingStatus.LOADED,
    ),
    selectCitiesError: createSelector(selectCitiesState, (cities) => cities.error),
    selectSelectedCity: createSelector(selectCitiesState, (cities) => cities.selected),

    selectOffices: createSelector(selectOfficesState, (offices) => offices.items),
    selectIsOfficesLoading: createSelector(
      selectOfficesState,
      (offices) => offices.status === LoadingStatus.LOADING,
    ),
    selectIsOfficesLoaded: createSelector(
      selectOfficesState,
      (offices) => offices.status === LoadingStatus.LOADED,
    ),
    selectOfficesError: createSelector(selectOfficesState, (offices) => offices.error),
    selectSelectedOffice: createSelector(selectOfficesState, (offices) => offices.selected),

    selectActiveTabId: createSelector(selectPickupPointState, (state) => state.activeTabId),

    selectCourierDetails: createSelector(selectPickupPointState, (state) => state.courierDetails),
    selectDepartureDate: createSelector(selectPickupPointState, (state) => state.departureDate),
    selectForm: createSelector(selectPickupPointState, (state) => state.form),
  };
};
