import { ApiError, DeliveryCity, PickupCity } from '@shared/types';

export interface CitiesState<T extends PickupCity | DeliveryCity> {
  items: T[];
  isLoading: boolean;
  error: ApiError | null;
  selected: T | null;
}
