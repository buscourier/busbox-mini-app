import { citiesEffects } from './cities.effects';
import { initializationEffects } from './initialization.effects';
import { officesEffects } from './offices.effects';
import { persistenceEffects } from './persistence.effects';
import { resetEffects } from './reset.effects';
import { tabEffects } from './tab.effects';

export const DeliveryPointEffects = {
  ...citiesEffects,
  ...officesEffects,
  ...tabEffects,
  ...resetEffects,
  ...persistenceEffects,
  ...initializationEffects,
};
