import { Dictionary } from '@ngrx/entity';

import { Order } from './order.types';

export interface StoredDeliveryDetailsState {
  activeOrderId: string | null;
  entities: Dictionary<Order>;
}
