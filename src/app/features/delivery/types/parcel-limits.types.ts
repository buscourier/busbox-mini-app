export interface ParcelsLimits {
  MAX_PARCELS: number;
  TOTAL_QUANTITY_MAX: number;
  TOTAL_WEIGHT_MAX: number;
  TOTAL_DIMENSIONS_MAX: number;
}

/** Defines limits for a single parcel */
export interface ParcelLimits {
  QUANTITY: { MIN: number; MAX: number };
  WEIGHT: { MIN: number; MAX: number };
  DIMENSIONS: { MIN: number; MAX: number };
}
