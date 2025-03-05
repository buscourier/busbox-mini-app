import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { LoadingStatus } from '@shared/types';

import { PARCEL_LIMITS, PARCELS_LIMITS } from '../constants';
import { DeliveryRestrictions, OptionsState, Order } from '../types';

export interface DeliveryDetailsState extends EntityState<Order> {
  activeOrderId: string | null;
  options: OptionsState;
  restrictions: DeliveryRestrictions; // По-факту тут сейчас cargoRestrictions,
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id as string,
});

export const initialState: DeliveryDetailsState = adapter.getInitialState({
  activeOrderId: null,
  options: {
    status: LoadingStatus.IDLE,
    data: null,
    error: null,
  },
  restrictions: {
    autoParts: null,
    otherCargo: null,
    parcels: PARCELS_LIMITS.DEFAULT,
    parcel: PARCEL_LIMITS.DEFAULT,
  },
});
