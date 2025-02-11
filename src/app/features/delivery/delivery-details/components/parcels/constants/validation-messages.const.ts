import { DimensionsError, LimitError } from '../types';

export const PARCEL_VALIDATION_MESSAGES = {
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

export const PARCELS_VALIDATION_MESSAGES = {
  maxItems: ({ max }: LimitError) => `Максимальное количество посылок: ${max}`,

  totalQuantityMax: ({ max, actual }: LimitError) =>
    `Превышено общее количество мест: ${actual} из ${max} (на ${actual - max})`,

  totalDimensionsMax: ({ max, actual }: LimitError) =>
    `Превышены общие габариты: ${actual} см из ${max} см (на ${actual - max} см)`,

  totalWeightMax: ({ max, actual }: LimitError) =>
    `Превышен общий вес: ${actual} кг из ${max} кг (на ${actual - max} кг)`,
} as const;
