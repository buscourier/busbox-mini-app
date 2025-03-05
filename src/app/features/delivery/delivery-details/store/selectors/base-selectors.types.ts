import { Dictionary } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';

import { ApiError } from '@shared/types';

import { DeliveryOptions, DeliveryRestrictions, Order } from '../../types';

export interface BaseSelectors {
  // Entity selectors
  selectAll: MemoizedSelector<object, Order[]>;
  selectEntities: MemoizedSelector<object, Dictionary<Order>>;
  selectIds: MemoizedSelector<object, string[] | number[]>;
  selectTotal: MemoizedSelector<object, number>;

  // State selectors
  selectIsOptionsLoading: MemoizedSelector<object, boolean>;
  selectIsOptionsLoaded: MemoizedSelector<object, boolean>;
  selectOptionsError: MemoizedSelector<object, boolean>;
  selectOptions: MemoizedSelector<object, DeliveryOptions | null>;
  selectActiveOrderId: MemoizedSelector<object, string | null>;
  selectRestrictions: MemoizedSelector<object, DeliveryRestrictions>;
  selectError: MemoizedSelector<object, ApiError | null>;
}
