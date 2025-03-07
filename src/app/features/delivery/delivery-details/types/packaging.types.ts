// export interface PackagingService {
//   id: string;
//   name: string;
//   site_name: string | null;
//   price: string;
//   property: string | null;
//   group_id: string;
//   subgroup_id: string;
// }

export interface PackagingItem {
  id: string;
  quantity: number;
}

export interface Packaging {
  items: PackagingItem[];
}

// export const PackagingGroups = {
//   Box: '1',
//   SafePack: '2',
//   PolyPack: '3',
//   Film: '6',
//   Other: ['4', '5'],
// } as const;

export interface PackagingDetails {
  type: string | null;
  variant: string;
  price: string;
  quantity: number;
}
