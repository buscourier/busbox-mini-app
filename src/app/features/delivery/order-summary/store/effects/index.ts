import { calculationEffects } from './calculation.effects';
import { resetEffects } from './reset.effects';

export const OrderSummaryEffects = {
  ...calculationEffects,
  ...resetEffects,
};
