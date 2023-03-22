import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';

import { MessageService } from '@my-org/chat/shared/data-access';
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
      <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-message-list [messages]="vm.messages"></app-message-list>
      </ion-content>
      <ion-footer>
        <app-message-input (send)="addMessage($event)"> </app-message-input>
      </ion-footer>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public vm$ = combineLatest([this.store.messages$]).pipe(
    map(([messages]) => ({ messages }))
  );

  constructor(
    private store: HomeStore,
    private messageService: MessageService
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
