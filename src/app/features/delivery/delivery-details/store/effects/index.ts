import { citySelectionEffects } from './city-selection.effects';
import { formEffects } from './form.effects';
import { persistenceEffects } from './persistence.effects';
import { restrictionsEffects } from './restrictions.effects';
import { settingsEffects } from './settings.effects';

export const DeliveryDetailsEffects = {
  ...citySelectionEffects,
  ...persistenceEffects,
  ...settingsEffects,
  ...restrictionsEffects,
  ...formEffects,
};
