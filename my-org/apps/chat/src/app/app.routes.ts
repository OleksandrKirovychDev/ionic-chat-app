import { Route } from '@angular/router';
import { LoginGuard } from '@my-org/chat/core/guards';

export const appRoutes: Route[] = [
  {
    path: 'home',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('@my-org/chat/home/feature').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@my-org/chat/login/feature').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
