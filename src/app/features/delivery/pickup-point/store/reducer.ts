import { createReducer, on } from '@ngrx/store';

import { PickupPointActions } from './actions';
import { PickupPointState } from './state';

export const initialState: PickupPointState = {
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
  departureDate: new Date().toISOString(),
  form: {
    isValid: false,
  },
  activeTabId: null,
};

export const pickupPointReducer = createReducer(
  initialState,
  on(
    PickupPointActions.loadCities,
    (state): PickupPointState => ({
      ...state,
      cities: {
        ...state.cities,
        isLoading: true,
        error: null,
      },
    }),
  ),
  on(
    PickupPointActions.loadCitiesSuccess,
    (state, { cities }): PickupPointState => ({
      ...state,
      cities: {
        ...state.cities,
        items: cities,
        isLoading: false,
      },
    }),
  ),
  on(
    PickupPointActions.loadCitiesFailure,
    (state, { error }): PickupPointState => ({
      ...state,
      cities: {
        ...state.cities,
        error,
        isLoading: false,
      },
    }),
  ),
  on(
    PickupPointActions.selectCity,
    (state, { city }): PickupPointState => ({
      ...state,
      cities: {
        ...state.cities,
        selected: city,
      },
    }),
  ),
  on(
    PickupPointActions.loadOffices,
    (state): PickupPointState => ({
      ...state,
      offices: {
        ...state.offices,
        isLoading: true,
        error: null,
      },
    }),
  ),
  on(
    PickupPointActions.loadOfficesSuccess,
    (state, { offices }): PickupPointState => ({
      ...state,
      offices: {
        ...state.offices,
        items: offices,
        isLoading: false,
      },
    }),
  ),
  on(
    PickupPointActions.loadOfficesFailure,
    (state, { error }): PickupPointState => ({
      ...state,
      offices: {
        ...state.offices,
        error,
        isLoading: false,
      },
    }),
  ),
  on(
    PickupPointActions.selectOffice,
    (state, { office }): PickupPointState => ({
      ...state,
      offices: {
        ...state.offices,
        selected: office,
      },
    }),
  ),
  on(
    PickupPointActions.resetOffice,
    (state): PickupPointState => ({
      ...state,
      offices: {
        ...state.offices,
        selected: null,
      },
    }),
  ),
  on(
    PickupPointActions.setActiveTabId,
    (state, { activeTabId }): PickupPointState => ({
      ...state,
      activeTabId,
    }),
  ),
  on(
    PickupPointActions.resetActiveTabId,
    (state): PickupPointState => ({
      ...state,
      activeTabId: null,
    }),
  ),
  on(
    PickupPointActions.updateCourierDetails,
    (state, { courierDetails }): PickupPointState => ({
      ...state,
      courierDetails,
    }),
  ),
  on(
    PickupPointActions.resetCourierDetails,
    (state): PickupPointState => ({
      ...state,
      courierDetails: null,
    }),
  ),
  on(
    PickupPointActions.setFormValidity,
    (state, { isValid }): PickupPointState => ({
      ...state,
      form: {
        ...state.form,
        isValid,
      },
    }),
  ),
  on(
    PickupPointActions.setDepartureDate,
    (state, { departureDate }): PickupPointState => ({
      ...state,
      departureDate,
    }),
  ),
  on(
    PickupPointActions.restoreState,
    (state, { restoredState }): PickupPointState => ({
      ...state,
      activeTabId: restoredState.activeTabId,
      cities: {
        ...state.cities,
        // items: restoredState.cities.items,
        selected: restoredState.cities.selected,
      },
      offices: {
        ...state.offices,
        // items: restoredState.offices.items,
        selected: restoredState.offices.selected,
      },
      courierDetails: restoredState.courierDetails,
      departureDate: restoredState.departureDate,
    }),
  ),

  /**
   * Resets the form with an optional option to keep the selected city.
   * @param keepCity - whether to keep the current city
   * @param city - the new city to set after the reset
   */
  on(
    PickupPointActions.resetState,
    (state, { keepCity, city }): PickupPointState => ({
      ...state,
      cities: {
        ...state.cities,
        selected: keepCity ? city || state.cities.selected : null,
      },
      offices: {
        ...state.offices,
        selected: null,
      },
      courierDetails: null,
      departureDate: new Date().toISOString(),
      activeTabId: null,
      form: {
        isValid: false,
        // validationErrors: undefined,
        // touched: {},
        // isSubmitting: false,
        // isDirty: false,
      },
    }),
  ),
);
