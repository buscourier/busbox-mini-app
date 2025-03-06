import { LimitError } from './types';

export const PARCELS_VALIDATION_MESSAGES = {
  maxItems: ({ max }: LimitError) => `Максимальное количество посылок: ${max}`,

  totalQuantityMax: ({ max, actual }: LimitError) =>
    `Превышено общее количество мест: ${actual} из ${max} (на ${actual - max})`,

  totalDimensionsMax: ({ max, actual }: LimitError) =>
    `Превышены общие габариты: ${actual} см из ${max} см (на ${actual - max} см)`,

  totalWeightMax: ({ max, actual }: LimitError) =>
    `Превышен общий вес: ${actual} кг из ${max} кг (на ${actual - max} кг)`,
} as const;
