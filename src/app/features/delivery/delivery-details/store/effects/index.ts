import { citySelectionEffects } from './city-selection.effects';
import { optionsEffects } from './options.effects';
import { persistenceEffects } from './persistence.effects';
import { restrictionsEffects } from './restrictions.effects';

export const DeliveryDetailsEffects = {
  ...citySelectionEffects,
  ...persistenceEffects,
  ...optionsEffects,
  ...restrictionsEffects,
};
