import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';

import { ICredentials } from '@my-org/chat/shared/interfaces';
import { TLoginStatus } from '@my-org/chat/login/utils';
import { AuthService } from '@my-org/chat/shared/data-access';

interface LoginState {
  status: TLoginStatus;
  createModalIsOpen: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginStore extends ComponentStore<LoginState> {
  public status$ = this.select((state) => state.status);
  public createModalIsOpen$ = this.select((state) => state.createModalIsOpen);

  public login = this.effect((credentials: Observable<ICredentials>) =>
    credentials.pipe(
      tap(() => this.patchState({ status: 'authenticating' })),
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
          tapResponse(
            (user) => {
              this.patchState({ status: 'success' });
              this.navCtrl.navigateRoot('/home');
            },
            (err) => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    super({ status: 'pending', createModalIsOpen: false });
  }

  public setCreateModalOpen(isOpen: boolean) {
    this.patchState({ createModalIsOpen: isOpen });
  }
}
