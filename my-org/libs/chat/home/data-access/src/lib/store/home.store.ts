import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';

import { AuthService, MessageService } from '@my-org/chat/shared/data-access';
import { IMessage } from '@my-org/chat/shared/interfaces';
import { NavController } from '@ionic/angular';

export interface HomeState {
  messages: IMessage[];
}

@Injectable({ providedIn: 'root' })
export class HomeStore extends ComponentStore<HomeState> {
  public messages$ = this.select((state) => state.messages);

  constructor(
    private messageServie: MessageService,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    super({ messages: [] });
  }

  loadMessages = this.effect(($) =>
    $.pipe(
      switchMap(() =>
        this.messageServie.getMessages().pipe(
          tapResponse(
            (messages) => this.patchState({ messages }),
            (err) => console.log(err)
          )
        )
      )
    )
  );

  logout = this.effect(($) =>
    $.pipe(
      switchMap(() =>
        this.authService.logOut().pipe(
          tapResponse(
            () => this.navCtrl.navigateRoot('/login'),
            (err) => console.log(err)
          )
        )
      )
    )
  );
}
