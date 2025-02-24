import { citySelectionEffects } from './city-selection.effects';
import { persistenceEffects } from './persistence.effects';
import { resetEffects } from './reset.effects';
import { restrictionsEffects } from './restrictions.effects';
import { settingsEffects } from './settings.effects';

export const DeliveryDetailsEffects = {
  ...citySelectionEffects,
  ...persistenceEffects,
  ...settingsEffects,
  ...restrictionsEffects,
  ...resetEffects,
};
