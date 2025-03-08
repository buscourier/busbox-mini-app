import type { PreferredTimeSlot } from '@shared/types';

export type CourierId = '1' | '2';

export interface CourierDetails {
  street: string;
  building: string;
  apartment: string;
  preferredTime: PreferredTimeSlot;
}

export interface Courier {
  id: CourierId;
  details: CourierDetails;
}
