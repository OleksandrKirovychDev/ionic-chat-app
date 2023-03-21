import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.component').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.component').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
