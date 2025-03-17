export type PackagingOtherGroupIds = '4' | '5';

export const PackagingGroupId = {
  BOXES: '1',
  SAFE_PACKS: '2',
  POLY_PACKS: '3',
  FILMS: '6',
  OTHER: ['4', '5'] as PackagingOtherGroupIds[],
} as const;

export const PACKAGING_DEFAULT_QUANTITY = 1;

export const PACKAGE_NAMES: Record<string, string> = {
  '1': 'Коробка',
  '2': 'Сейф-пакет',
  '3': 'Полиэтиленовый пакет',
  '4': 'Другое',
  '5': 'Другое',
  '6': 'Пленка',
};
