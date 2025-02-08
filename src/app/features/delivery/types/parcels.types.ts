export interface DimensionsGroup {
  width: number;
  height: number;
  length: number;
}

export interface Parcel {
  quantity: number;
  weight: number;
  dimensions: DimensionsGroup;
}

export interface ParcelData {
  items: Parcel[];
}
