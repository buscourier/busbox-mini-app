import type { DeliveryCity } from '@shared/types';

/** Base types */
export interface ParcelItemDimensions {
  width: number;
  height: number;
  length: number;
}

export interface ParcelItem {
  quantity: number;
  weight: number;
  dimensions: ParcelItemDimensions;
}

export interface Parcels {
  items: ParcelItem[];
}

/** Limits types */
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

/** Errors types */
export interface ParcelsLimitError {
  max: number;
  actual: number;
}

export interface ParcelsErrors {
  maxParcels?: ParcelsLimitError;
  totalQuantityMax?: ParcelsLimitError;
  totalDimensionsMax?: ParcelsLimitError;
  totalWeightMax?: ParcelsLimitError;
}

export interface ParcelItemDimensionsError {
  error: boolean;
  diff: number;
}
