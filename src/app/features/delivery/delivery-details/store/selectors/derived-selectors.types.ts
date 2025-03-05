import { MemoizedSelector } from '@ngrx/store';

import { ActiveOrderDetails, Cargo, EnhancedOrder, Order, Service } from '../../types';

export interface DerivedSelectors {
  selectActiveOrder: MemoizedSelector<object, Order | null>;
  selectIsActiveOrderValid: MemoizedSelector<object, boolean>;
  selectIsAllOrdersValid: MemoizedSelector<object, boolean>;
  selectEnhancedOrders: MemoizedSelector<object, EnhancedOrder[]>;
  selectCargoTypes: MemoizedSelector<object, Cargo[]>;
  selectAutoPartsOptions: MemoizedSelector<object, Cargo[]>;
  selectOtherCargosOptions: MemoizedSelector<object, Cargo[]>;
  selectAdditionalServicesOptions: MemoizedSelector<object, Service[]>;
  selectPackagingOptions: MemoizedSelector<object, Service[]>;
  selectActiveOrderDetails: MemoizedSelector<object, ActiveOrderDetails>;
}
