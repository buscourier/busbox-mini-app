export type PackagingOtherGroupIds = '4' | '5';

export const PackagingGroupId = {
  BOXES: '1',
  SAFE_PACKS: '2',
  POLY_PACKS: '3',
  FILMS: '6',
  OTHER: ['4', '5'] as PackagingOtherGroupIds[],
} as const;
