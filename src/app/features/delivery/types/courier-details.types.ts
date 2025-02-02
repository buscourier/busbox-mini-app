import { PreferredTimeSlot } from '@shared/types';

export interface CourierDetails {
  street: string;
  building: string;
  apartment: string;
  preferredTime: PreferredTimeSlot;
}
