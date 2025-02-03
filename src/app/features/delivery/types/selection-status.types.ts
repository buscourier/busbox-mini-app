import { DeliveryCity, Office, PickupCity } from '@shared/types';

export interface SelectionStatus<T extends PickupCity | DeliveryCity> {
  selectedCity: T | null;
  selectedOffice: Office | null;
  isFullySelected: boolean;
}
