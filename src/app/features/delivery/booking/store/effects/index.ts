import { bookingEffects } from './booking.effects';
import { initializationEffects } from './initialization.effects';
import { persistenceEffects } from './persistence.effects';
import { resetEffects } from './reset.effects';

export const BookingEffects = {
  ...initializationEffects,
  ...persistenceEffects,
  ...resetEffects,
  ...bookingEffects,
};
