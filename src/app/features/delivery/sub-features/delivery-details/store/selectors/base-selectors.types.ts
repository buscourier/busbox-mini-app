import { Dictionary } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';

import { DeliveryRestrictions, DeliverySettings, Order } from '@features/delivery/types';

export interface BaseSelectors {
  // Entity selectors
  selectAll: MemoizedSelector<object, Order[]>;
  selectEntities: MemoizedSelector<object, Dictionary<Order>>;
  selectIds: MemoizedSelector<object, string[] | number[]>;
  selectTotal: MemoizedSelector<object, number>;

  // State selectors
  selectIsSettingsLoading: MemoizedSelector<object, boolean>;
  selectIsSettingsLoaded: MemoizedSelector<object, boolean>;
  selectSettings: MemoizedSelector<object, DeliverySettings | null>;
  selectActiveOrderId: MemoizedSelector<object, string | null>;
  selectRestrictions: MemoizedSelector<object, DeliveryRestrictions>;
  selectError: MemoizedSelector<object, string | null>;
}
