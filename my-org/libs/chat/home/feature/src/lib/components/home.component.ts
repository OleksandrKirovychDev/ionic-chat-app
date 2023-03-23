import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';

import { AuthService, MessageService } from '@my-org/chat/shared/data-access';
import { HomeStore } from '@my-org/chat/home/data-access';
import { MessageInputComponent } from '@my-org/chat/home/ui';
import { MessageListComponent } from '@my-org/chat/home/ui';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    IonicModule,
    MessageListComponent,
    MessageInputComponent,
  ],
  providers: [HomeStore],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button (click)="store.logout()">
              <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <my-org-message-list
          [messages]="vm.messages"
          [activeUser]="(authService.auth$ | async)!"
        ></my-org-message-list>
      </ion-content>
      <ion-footer>
        <my-org-message-input (send)="addMessage($event)">
        </my-org-message-input>
      </ion-footer>
    </ng-container>
  `,
  styles: [
    `
      ion-content {
        --ion-background-color: var(--ion-color-primary);
      }

      ion-title img {
        max-height: 39px;
        margin-top: 9px;
        filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public vm$ = combineLatest([this.store.messages$]).pipe(
    map(([messages]) => ({ messages }))
  );

  constructor(
    private messageService: MessageService,
    protected store: HomeStore,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.loadMessages();
  }

  public addMessage(message: string) {
    this.messageService.addMessage(message);
  }
}

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
