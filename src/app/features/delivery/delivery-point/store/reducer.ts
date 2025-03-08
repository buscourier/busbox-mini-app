import { createReducer, on } from '@ngrx/store';

import { FormControlStatus, LoadingStatus } from '@shared/types';

import { DeliveryPointActions } from './actions';
import type { DeliveryPointState } from './state';

export const initialState: DeliveryPointState = {
  cities: {
    items: [],
    status: LoadingStatus.IDLE,
    error: null,
    selected: null,
  },
  offices: {
    items: [],
    status: LoadingStatus.IDLE,
    error: null,
    selected: null,
  },
  courierDetails: null,
  busPickup: false,
  form: {
    status: FormControlStatus.INVALID,
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
        status: LoadingStatus.LOADING,
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
        status: LoadingStatus.LOADED,
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
        status: LoadingStatus.ERROR,
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
        status: LoadingStatus.LOADING,
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
        status: LoadingStatus.LOADED,
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
        status: LoadingStatus.ERROR,
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
    (state, { status, pristine, touched, dirty }): DeliveryPointState => {
      return {
        ...state,
        form: {
          ...state.form,
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
