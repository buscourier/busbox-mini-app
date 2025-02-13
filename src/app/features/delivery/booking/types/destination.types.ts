import { DeliveryPointState } from '@features/delivery/delivery-point/store';

import { Recipient } from './recipient.types';

export interface Destination {
  recipient: Recipient;
  deliveryPoint?: DeliveryPointState;
}
