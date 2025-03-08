import type { DeliveryPointState } from '@features/delivery/delivery-point/store';

import type { Recipient } from './recipient.types';

export interface Destination {
  recipient: Recipient;
  deliveryPoint?: DeliveryPointState;
}
