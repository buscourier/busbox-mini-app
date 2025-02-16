import { bookingEffects } from './booking.effects';
import { persistenceEffects } from './persistence.effects';

export const BookingEffects = {
  ...persistenceEffects,
  ...bookingEffects,
};
