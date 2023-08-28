import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserSignedin()) { // Se autorizado, return true
    return true;
  } else { // Se não autorizado, return false e navega para /login
    router.navigate(['/login']);
    return false;
  }
};

