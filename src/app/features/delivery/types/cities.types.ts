import { ApiError, DeliveryCity, LoadingStatus, PickupCity } from '@shared/types';

export interface CitiesState<T extends PickupCity | DeliveryCity> {
  items: T[];
  status: LoadingStatus;
  error: ApiError | null;
  selected: T | null;
}

export interface CitiesViewModel<T extends PickupCity | DeliveryCity> {
  items: T[];
  isLoading: boolean;
  isLoaded: boolean;
  error: ApiError | null;
  selected: T | null;
}
