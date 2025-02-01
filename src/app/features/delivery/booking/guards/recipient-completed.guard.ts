import { CanActivateFn } from '@angular/router';

export const recipientCompletedGuard: CanActivateFn = (route, state) => {
  console.log('recipientCompletedGuard', route, state);
  return true;
};
