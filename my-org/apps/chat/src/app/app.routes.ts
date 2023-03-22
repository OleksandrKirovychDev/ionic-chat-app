import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadChildren: () =>
      import('@my-org/chat/home/feature').then((m) => m.HOME_ROUTES),
  },
];
