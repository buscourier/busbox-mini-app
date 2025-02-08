export const CargoTypeId = {
  ROOT: '0',
  DOCUMENTS: '1',
  PARCELS: '2',
  AUTO_PARTS: '5',
  OTHER: '21',
} as const;

export const CargoType = {
  DOCUMENTS: 'DOCUMENTS',
  PARCELS: 'PARCELS',
  AUTO_PARTS: 'AUTO_PARTS',
  OTHER: 'OTHER',
} as const;

export type CargoType = (typeof CargoType)[keyof typeof CargoType];

export interface Cargo {
  id: string;
  name: string;
  parent_id: string;
  use_dimensions: string;
}
