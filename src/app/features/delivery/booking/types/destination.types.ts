import type { DeliveryPointState } from '@delivery/delivery-point/store/state';

import type { Recipient } from './recipient.types';

export interface Destination {
  recipient: Recipient;
  deliveryPoint?: DeliveryPointState;
}
