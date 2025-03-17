export interface PackagingItem {
  id: string;
  quantity: number;
}

export interface Packaging {
  items: PackagingItem[];
}

export interface PackagingDetails {
  type: string | null;
  variant: string;
  price: string;
  quantity: number;
}

export interface SelectedPackagingItem {
  title: string;
  description: string | null;
  dimensions: string | null;
  currentQuantity: number;
}
