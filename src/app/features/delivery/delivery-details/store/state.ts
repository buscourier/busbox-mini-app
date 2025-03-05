import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ApiError, LoadingStatus } from '@shared/types';

import { PARCEL_LIMITS, PARCELS_LIMITS } from '../constants';
import { DeliveryOptions, DeliveryRestrictions, Order } from '../types';

export interface DeliveryDetailsState extends EntityState<Order> {
  optionsStatus: LoadingStatus;
  options: DeliveryOptions | null;
  activeOrderId: string | null;
  restrictions: DeliveryRestrictions; // По-факту тут сейчас cargoRestrictions,
  error: ApiError | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id as string,
});

export const initialState: DeliveryDetailsState = adapter.getInitialState({
  optionsStatus: LoadingStatus.IDLE,
  options: null,
  activeOrderId: null,
  restrictions: {
    autoParts: null,
    otherCargo: null,
    parcels: PARCELS_LIMITS.DEFAULT,
    parcel: PARCEL_LIMITS.DEFAULT,
  },
  error: null,
});
