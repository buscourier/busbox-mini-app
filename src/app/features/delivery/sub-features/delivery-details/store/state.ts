import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PARCEL_LIMITS, PARCELS_LIMITS } from '@features/delivery/constants';
import { DeliveryRestrictions, DeliverySettings, Order } from '@features/delivery/types';

export interface DeliveryDetailsState extends EntityState<Order> {
  isSettingsLoading: boolean;
  isSettingsLoaded: boolean;
  settings: DeliverySettings | null;
  activeOrderId: string | null;
  restrictions: DeliveryRestrictions; // По-факту тут сейчас cargoRestrictions,
  error: string | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id as string,
});

export const initialState: DeliveryDetailsState = adapter.getInitialState({
  isSettingsLoading: false,
  isSettingsLoaded: false,
  settings: null,
  activeOrderId: null,
  restrictions: {
    autoParts: null,
    otherCargo: null,
    parcels: PARCELS_LIMITS.DEFAULT,
    parcel: PARCEL_LIMITS.DEFAULT,
  },
  error: null,
});
