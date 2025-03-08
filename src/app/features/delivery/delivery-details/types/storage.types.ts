import type { Dictionary } from '@ngrx/entity';

import type { Order } from './order.types';

export interface StoredDeliveryDetailsState {
  activeOrderId: string | null;
  entities: Dictionary<Order>;
}
