import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { HomeStore } from './data-access/home.store';
import { MessageListComponent } from './ui/message-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule, MessageListComponent],
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
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public vm$ = combineLatest([this.store.messages$]).pipe(
    map(([messages]) => ({ messages }))
  );

  constructor(private store: HomeStore) {}

  ngOnInit(): void {
    this.store.loadMessages();
  }
}

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
