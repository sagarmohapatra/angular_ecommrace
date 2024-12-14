import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellService } from './services/sell.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SellService); // Inject the AuthService

  if(localStorage.getItem("seller")){
    return true
  }
  return authService.isSellerLoggedIn;
};
 