import { PickupPointState } from '@features/delivery/pickup-point/store';

import { Sender } from './sender.types';

export interface Departure {
  sender: Sender | null;
  pickupPoint?: PickupPointState | null; ///???????????
}
