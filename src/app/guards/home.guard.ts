import { CanActivateFn } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  return true;
};
