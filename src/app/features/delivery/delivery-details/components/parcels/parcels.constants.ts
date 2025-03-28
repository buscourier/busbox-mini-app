import type { ParcelsLimitError } from './parcels.types';

export const PARCELS_VALIDATION_MESSAGES = {
  maxItems: ({ max }: ParcelsLimitError) => `Максимальное количество посылок: ${max}`,

  totalQuantityMax: ({ max, actual }: ParcelsLimitError) =>
    `Превышено общее количество мест: ${actual} из ${max} (на ${actual - max})`,

  totalDimensionsMax: ({ max, actual }: ParcelsLimitError) =>
    `Превышены общие габариты: ${actual} см из ${max} см (на ${actual - max} см)`,

  totalWeightMax: ({ max, actual }: ParcelsLimitError) =>
    `Превышен общий вес: ${actual} кг из ${max} кг (на ${actual - max} кг)`,
} as const;
