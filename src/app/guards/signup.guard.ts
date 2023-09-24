import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const signupGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserFirstAcess() && authService.isUserFirstAcess().toString() != 'false') {
    return true;
  } else {
    router.navigate(['home'])
    return false;
  }
};
