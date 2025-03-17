import type { MemoizedSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

import { FormControlStatus, LoadingStatus } from '@shared/types';

import type { DeliveryPointState } from '../state';

import type { BaseSelectors } from './base-selectors.types';

type DeliveryPointStateSelector = MemoizedSelector<object, DeliveryPointState>;

export const createBaseSelectors = (
  selectDeliveryPointState: DeliveryPointStateSelector,
): BaseSelectors => {
  const selectCitiesState = createSelector(selectDeliveryPointState, (state) => state.cities);
  const selectOfficesState = createSelector(selectDeliveryPointState, (state) => state.offices);
  const selectForm = createSelector(selectDeliveryPointState, (state) => state.form);

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

    selectActiveTabId: createSelector(selectDeliveryPointState, (state) => state.activeTabId),

    selectCourierDetails: createSelector(selectDeliveryPointState, (state) => state.courierDetails),
    selectBusPickup: createSelector(selectDeliveryPointState, (state) => state.busPickup),
    selectForm,
    selectIsFormValid: createSelector(
      selectForm,
      (form) => form.status === FormControlStatus.VALID,
    ),

    selectIsFormInvalid: createSelector(
      selectForm,
      (form) => form.status === FormControlStatus.INVALID,
    ),

    selectIsFormDisabled: createSelector(
      selectForm,
      (form) => form.status === FormControlStatus.DISABLED,
    ),

    selectIsFormPending: createSelector(
      selectForm,
      (form) => form.status === FormControlStatus.PENDING,
    ),
  };
};
