import { citiesEffects } from './cities.effects';
import { formEffects } from './form.effects';
import { initializationEffects } from './initialization.effects';
import { officesEffects } from './offices.effects';
import { persistenceEffects } from './persistence.effects';
import { tabEffects } from './tab.effects';

export const PickupPointEffects = {
  ...initializationEffects,
  ...persistenceEffects,
  ...citiesEffects,
  ...officesEffects,
  ...tabEffects,
  ...formEffects,
};
