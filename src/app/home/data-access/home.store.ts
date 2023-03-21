import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';
import { MessageService } from 'src/app/shared/data-access/message.service';
import { IMessage } from 'src/app/shared/interfaces/message.interface';

export interface HomeState {
  messages: IMessage[];
}

@Injectable({ providedIn: 'root' })
export class HomeStore extends ComponentStore<HomeState> {
  public messages$ = this.select((state) => state.messages);

  constructor(private messageServie: MessageService) {
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
}
