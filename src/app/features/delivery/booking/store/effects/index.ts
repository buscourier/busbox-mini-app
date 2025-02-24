import { bookingEffects } from './booking.effects';
import { persistenceEffects } from './persistence.effects';
import { resetEffects } from './reset.effects';

export const BookingEffects = {
  ...persistenceEffects,
  ...resetEffects,
  ...bookingEffects,
};
