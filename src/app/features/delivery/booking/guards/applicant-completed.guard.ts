import { CanActivateFn } from '@angular/router';

export const applicantCompletedGuard: CanActivateFn = (route, state) => {
  console.log('applicantCompletedGuard', route, state);
  return true;
};
