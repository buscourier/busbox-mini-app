export interface LimitError {
  max: number;
  actual: number;
}

export interface ParcelsErrors {
  maxParcels?: LimitError;
  totalQuantityMax?: LimitError;
  totalDimensionsMax?: LimitError;
  totalWeightMax?: LimitError;
}
