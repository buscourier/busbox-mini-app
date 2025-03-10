import type { PickupPointState } from '@delivery/pickup-point/store';

import type { Sender } from './sender.types';

export interface Departure {
  sender: Sender | null;
  pickupPoint?: PickupPointState | null; ///???????????
}
