import { CanActivateFn } from '@angular/router';

export const senderCompletedGuard: CanActivateFn = (route, state) => {
  console.log('senderCompletedGuard', route, state);
  return true;
};
