import { createReducer, on } from '@ngrx/store';

import { FormStatus } from '@shared/types/form.types';

import { DeliveryPointActions } from './actions';
import { DeliveryPointState } from './state';

export const initialState: DeliveryPointState = {
  cities: {
    items: [],
    isLoading: false,
    error: null,
    selected: null,
  },
  offices: {
    items: [],
    isLoading: false,
    error: null,
    selected: null,
  },
  courierDetails: null,
  busPickup: false,
  form: {
    isValid: false,
    status: FormStatus.INVALID,
    pristine: true,
    touched: false,
    dirty: false,
  },
  activeTabId: null,
};

export const deliveryPointReducer = createReducer(
  initialState,

  // Cities
  on(
    DeliveryPointActions.loadCities,
    (state): DeliveryPointState => ({
      ...state,
      cities: {
        ...state.cities,
        isLoading: true,
        error: null,
      },
    }),
  ),
  on(
    DeliveryPointActions.loadCitiesSuccess,
    (state, { cities }): DeliveryPointState => ({
      ...state,
      cities: {
        ...state.cities,
        items: cities,
        isLoading: false,
      },
    }),
  ),
  on(
    DeliveryPointActions.loadCitiesFailure,
    (state, { error }): DeliveryPointState => ({
      ...state,
      cities: {
        ...state.cities,
        error,
        isLoading: false,
      },
    }),
  ),
  on(
    DeliveryPointActions.selectCity,
    (state, { city }): DeliveryPointState => ({
      ...state,
      cities: {
        ...state.cities,
        selected: city,
      },
    }),
  ),

  // Offices
  on(
    DeliveryPointActions.loadOffices,
    (state): DeliveryPointState => ({
      ...state,
      offices: {
        ...state.offices,
        isLoading: true,
      },
    }),
  ),

  on(
    DeliveryPointActions.loadOfficesSuccess,
    (state, { offices }): DeliveryPointState => ({
      ...state,
      offices: {
        ...state.offices,
        items: offices,
        isLoading: false,
      },
    }),
  ),
  on(
    DeliveryPointActions.loadOfficesFailure,
    (state, { error }): DeliveryPointState => ({
      ...state,
      offices: {
        ...state.offices,
        error,
        isLoading: false,
      },
    }),
  ),
  on(
    DeliveryPointActions.selectOffice,
    (state, { office }): DeliveryPointState => ({
      ...state,
      offices: {
        ...state.offices,
        selected: office,
      },
    }),
  ),
  on(
    DeliveryPointActions.resetOffice,
    (state): DeliveryPointState => ({
      ...state,
      offices: {
        ...state.offices,
        selected: null,
      },
    }),
  ),

  // Tabs
  on(
    DeliveryPointActions.setActiveTabId,
    (state, { activeTabId }): DeliveryPointState => ({
      ...state,
      activeTabId,
    }),
  ),
  on(
    DeliveryPointActions.resetActiveTabId,
    (state): DeliveryPointState => ({
      ...state,
      activeTabId: null,
    }),
  ),

  // Courier
  on(
    DeliveryPointActions.updateCourierDetails,
    (state, { courierDetails }): DeliveryPointState => ({
      ...state,
      courierDetails,
    }),
  ),
  on(
    DeliveryPointActions.resetCourierDetails,
    (state): DeliveryPointState => ({
      ...state,
      courierDetails: null,
    }),
  ),

  // Bus pickup
  on(
    DeliveryPointActions.setBusPickup,
    (state, { enabled }): DeliveryPointState => ({
      ...state,
      busPickup: enabled,
    }),
  ),
  on(
    DeliveryPointActions.setFormState,
    (state, { isValid, status, pristine, touched, dirty }): DeliveryPointState => {
      return {
        ...state,
        form: {
          ...state.form,
          isValid,
          status,
          pristine,
          touched,
          dirty,
        },
      };
    },
  ),
  on(
    DeliveryPointActions.restoreState,
    (state, { restoredState }): DeliveryPointState => ({
      ...state,
      cities: {
        ...state.cities,
        selected: restoredState.cities.selected,
      },
      offices: {
        ...state.offices,
        selected: restoredState.offices.selected,
      },
      activeTabId: restoredState.activeTabId,
      courierDetails: restoredState.courierPoint,
      busPickup: restoredState.busPickup,
    }),
  ),
  on(DeliveryPointActions.resetState, (state, { keepCity, city }): DeliveryPointState => {
    const savedData = keepCity
      ? {
          cities: {
            ...state.cities,
            selected: city || state.cities.selected,
          },
          offices: {
            ...state.offices,
            selected: null,
          },
        }
      : {};

    return {
      ...initialState,
      ...savedData,
    };
  }),
);
