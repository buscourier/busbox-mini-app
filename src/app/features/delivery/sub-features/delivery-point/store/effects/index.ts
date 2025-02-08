import { citiesEffects } from './cities.effects';
import { formEffects } from './form.effects';
import { initializationEffects } from './initialization.effects';
import { officesEffects } from './offices.effects';
import { persistenceEffects } from './persistence.effects';
import { tabEffects } from './tab.effects';

export const EndPointEffects = {
  ...citiesEffects,
  ...officesEffects,
  ...tabEffects,
  ...formEffects,
  ...persistenceEffects,
  ...initializationEffects,
};
