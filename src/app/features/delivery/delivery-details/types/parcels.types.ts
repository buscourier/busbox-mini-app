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
