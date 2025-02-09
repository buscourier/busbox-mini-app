import { MemoizedSelector } from '@ngrx/store';

import {
  ActiveOrderDetails,
  CargoTypesGroup,
  EnhancedOrder,
  Order,
  Service,
} from '@features/delivery/types';

export interface DerivedSelectors {
  selectActiveOrder: MemoizedSelector<object, Order | null>;
  selectIsActiveOrderValid: MemoizedSelector<object, boolean>;
  selectIsAllOrdersValid: MemoizedSelector<object, boolean>;
  selectEnhancedOrders: MemoizedSelector<object, EnhancedOrder[]>;
  selectCargoTypes: MemoizedSelector<object, CargoTypesGroup>;
  selectAdditionalServices: MemoizedSelector<object, Service[]>;
  selectPackaging: MemoizedSelector<object, Service[]>;
  selectActiveOrderDetails: MemoizedSelector<object, ActiveOrderDetails>;
}
