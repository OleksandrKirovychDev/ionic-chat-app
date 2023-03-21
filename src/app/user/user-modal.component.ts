import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../shared/data-access/auth.service';
import { ICredentials } from '../shared/interfaces/credentials.interface';
import { TUserStatus } from './types/user-status.type';
import { UserFromComponent } from './ui/user-form.component';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, UserFromComponent],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Create an Account</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="modalCtrl.dismiss()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-user-form
        *ngIf="userStatus$ | async as status"
        (user)="createAccount($event)"
        [userStatus]="status"
      >
      </app-user-form>
    </ion-content>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }

      ion-content {
        --background: linear-gradient(
          62deg,
          var(--ion-color-primary) 0%,
          var(--ion-color-secondary) 100%
        );
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModalComponent {
  public userStatus$ = new BehaviorSubject<TUserStatus>('pending');

  constructor(
    protected authService: AuthService,
    protected modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  protected async createAccount(credentials: ICredentials) {
    this.userStatus$.next('creating');
    try {
      await this.authService.createAccount(credentials);
      this.userStatus$.next('success');
      this.modalCtrl.dismiss();
      this.navCtrl.navigateRoot('/home');
    } catch (e) {
      this.userStatus$.next('error');
    }
  }
}
