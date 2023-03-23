import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, tap } from 'rxjs';

import { AuthService } from '@my-org/chat/shared/data-access';

export const LoginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const navCtrl = inject(NavController);

  return authService.auth$.pipe(
    map((user) => (user ? true : false)),
    tap((canActivate) => {
      if (!canActivate) {
        navCtrl.navigateForward('/home');
      }
    })
  );
};
