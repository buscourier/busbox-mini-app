export interface DimensionsError {
  error: boolean;
  diff: number;
}

export interface WeightError {
  error: boolean;
  max: number;
}

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
