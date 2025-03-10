import type { ParcelItem, ParcelItemLimits } from '@delivery/delivery-details/types';

import type { DimensionsError } from './parcel-item.types';

export const limitKeyMap: Record<
  Exclude<keyof ParcelItem, 'dimensions'>,
  keyof ParcelItemLimits
> = {
  quantity: 'QUANTITY',
  weight: 'WEIGHT',
};

export const PARCEL_ITEM_VALIDATION_MESSAGES = {
  required: 'Все поля обязательны для заполнения',
  dimensions: (error: DimensionsError) =>
    `Габариты посылки превышают допустимые размеры на ${error.diff} см.`,
  quantityMin: (context: { min: number }): string => `Минимальное количество мест:  ${context.min}`,
  quantityMax: (context: { max: number }): string => `Максимальное количество мест: ${context.max}`,
  weightMin: (context: { min: number }): string => `Минимальный вес:  ${context.min} кг.`,
  weightMax: (context: { max: number }): string => `Максимальный вес: ${context.max} кг.`,
  widthMin: (context: { min: number }): string => `Минимальная ширина:  ${context.min} см.`,
  widthMax: (context: { max: number }): string => `Максимальная ширина: ${context.max} см.`,
  heightMin: (context: { min: number }): string => `Минимальная высота:  ${context.min} см.`,
  heightMax: (context: { max: number }): string => `Максимальная высота: ${context.max} см.`,
  lengthMin: (context: { min: number }): string => `Минимальная длина:  ${context.min} см.`,
  lengthMax: (context: { max: number }): string => `Максимальная длина: ${context.max} см.`,
} as const;
