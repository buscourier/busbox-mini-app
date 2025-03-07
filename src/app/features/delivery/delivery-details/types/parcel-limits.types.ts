import { DeliveryCity } from '@shared/types';

export interface ParcelsLimits {
  MAX_PARCELS: number;
  TOTAL_QUANTITY_MAX: number;
  TOTAL_WEIGHT_MAX: number;
  TOTAL_DIMENSIONS_MAX: number;
}

export interface ParcelItemLimits {
  QUANTITY: { MIN: number; MAX: number };
  WEIGHT: { MIN: number; MAX: number };
  DIMENSIONS: { MIN: number; MAX: number };
}

export interface GetParcelItemLimitsParams {
  deliveryCity: DeliveryCity | null;
  isOfficeLimited: boolean;
  isCourierLimited: boolean;
}
