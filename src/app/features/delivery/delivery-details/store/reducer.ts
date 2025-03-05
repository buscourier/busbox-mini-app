import { createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/types';

import { PARCEL_LIMITS, PARCELS_LIMITS } from '../constants';
import { CargoType, Order } from '../types';
import { DeliveryDetailsActions, OrderActions } from './actions';
import { adapter, DeliveryDetailsState, initialState } from './state';

import { v4 as uuidv4 } from 'uuid';

export const deliveryDetailsReducer = createReducer(
  initialState,

  on(
    DeliveryDetailsActions.loadOptions,
    (state): DeliveryDetailsState => ({
      ...state,
      optionsStatus: LoadingStatus.LOADING,
      error: null,
    }),
  ),
  on(
    DeliveryDetailsActions.loadOptionsSuccess,
    (state, { options }): DeliveryDetailsState => ({
      ...state,
      optionsStatus: LoadingStatus.LOADED,
      options,
    }),
  ),
  on(
    DeliveryDetailsActions.loadOptionsFailure,
    (state, { error }): DeliveryDetailsState => ({
      ...state,
      optionsStatus: LoadingStatus.ERROR,
      error,
    }),
  ),

  on(
    DeliveryDetailsActions.setRestrictions,
    (state, { restrictions }): DeliveryDetailsState => ({
      ...state,
      restrictions: restrictions,
    }),
  ),
  on(DeliveryDetailsActions.resetOptions, (): DeliveryDetailsState => {
    return adapter.getInitialState({
      activeOrderId: null,
      optionsStatus: LoadingStatus.IDLE,
      options: null,
      restrictions: {
        autoParts: null,
        otherCargo: null,
        parcels: PARCELS_LIMITS.DEFAULT,
        parcel: PARCEL_LIMITS.DEFAULT,
      },
      error: null,
    });
  }),
  on(DeliveryDetailsActions.restoreState, (state, { restoredState }) => {
    const orders = Object.values(restoredState.entities).filter((order): order is Order => !!order);

    return adapter.setAll(orders, {
      ...state,
      activeOrderId: restoredState.activeOrderId,
    });
  }),

  // Order actions
  on(OrderActions.add, (state): DeliveryDetailsState => {
    const newOrder: Order = {
      id: uuidv4(),
      cargoType: null,
      documents: null,
      parcels: null,
      autoParts: null,
      otherCargo: null,
      packaging: null,
      additionalServices: null,
      validation: {},
    };

    const newState = adapter.addOne(newOrder, state);

    return {
      ...newState,
      activeOrderId: newOrder.id,
    };
  }),
  on(OrderActions.remove, (state, { orderId }): DeliveryDetailsState => {
    const newState = adapter.removeOne(orderId, state);
    const ids = adapter.getSelectors().selectIds(newState) as string[];

    return {
      ...newState,
      activeOrderId:
        state.activeOrderId === orderId
          ? ids.length
            ? ids[ids.length - 1]
            : null
          : state.activeOrderId,
    };
  }),
  on(
    OrderActions.setActive,
    (state, { orderId }): DeliveryDetailsState => ({
      ...state,
      activeOrderId: orderId,
    }),
  ),
  on(OrderActions.setCargoType, (state, { orderId, cargoType }): DeliveryDetailsState => {
    const order = state.entities[orderId];
    if (!order) return state;

    return adapter.updateOne(
      {
        id: orderId,
        changes: {
          cargoType,
          documents: cargoType === CargoType.DOCUMENTS ? order.documents : null,
          parcels: cargoType === CargoType.PARCELS ? order.parcels : null,
          autoParts: cargoType === CargoType.AUTO_PARTS ? order.autoParts : null,
          otherCargo: cargoType === CargoType.OTHER ? order.otherCargo : null,
        },
      },
      state,
    );
  }),
  on(OrderActions.updateData, (state, { orderId, data }): DeliveryDetailsState => {
    const order = state.entities[orderId];
    if (!order) return state;

    return adapter.updateOne(
      {
        id: orderId,
        changes: {
          ...data,
        },
      },
      state,
    );
  }),
  on(OrderActions.updateValidation, (state, { orderId, validation }): DeliveryDetailsState => {
    const order = state.entities[orderId];

    if (!order) return state;

    return adapter.updateOne(
      {
        id: orderId,
        changes: {
          validation: {
            ...order.validation,
            ...validation,
          },
        },
      },
      state,
    );
  }),
);
