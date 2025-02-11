export type OtherIds = '4' | '5';

export const PackagingId = {
  ROOT: '1',
  BOXES: '1',
  SAFE_PACKS: '2',
  POLY_PACKS: '3',
  FILMS: '6',
  OTHER: ['4', '5'] as OtherIds[],
} as const;

export const PACKAGING_DEFAULT_QUANTITY = 1;
