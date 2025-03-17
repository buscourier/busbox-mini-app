import type { Dictionary } from '@ngrx/entity';
import type { MemoizedSelector } from '@ngrx/store';

import type { ApiError } from '@shared/types';

import type { DeliveryOptions, DeliveryRestrictions, Order } from '../../types';

export interface BaseSelectors {
  // Entity selectors
  selectAll: MemoizedSelector<object, Order[]>;
  selectEntities: MemoizedSelector<object, Dictionary<Order>>;
  selectIds: MemoizedSelector<object, string[] | number[]>;
  selectTotal: MemoizedSelector<object, number>;

  // State selectors
  selectIsOptionsLoading: MemoizedSelector<object, boolean>;
  selectIsOptionsLoaded: MemoizedSelector<object, boolean>;
  selectOptions: MemoizedSelector<object, DeliveryOptions | null>;
  selectActiveOrderId: MemoizedSelector<object, string | null>;
  selectRestrictions: MemoizedSelector<object, DeliveryRestrictions>;
  selectOptionsError: MemoizedSelector<object, ApiError | null>;
}
