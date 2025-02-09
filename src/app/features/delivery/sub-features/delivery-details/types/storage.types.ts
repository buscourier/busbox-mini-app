import { Dictionary } from '@ngrx/entity';

import { Order } from '@features/delivery/types';

export interface StoredDeliveryDetailsState {
  activeOrderId: string | null;
  entities: Dictionary<Order>;
}
