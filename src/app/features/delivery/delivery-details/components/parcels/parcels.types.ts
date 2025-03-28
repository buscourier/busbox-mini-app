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
