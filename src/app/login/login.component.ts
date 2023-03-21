import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Routes } from '@angular/router';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { UserModalComponent } from '../user/user-modal.component';
import { LoginStore } from './data-access/login.store';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, LoginFormComponent, UserModalComponent],
  providers: [LoginStore],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-content>
        <div class="container">
          <img src="./assets/images/logo.png" />
          <app-login-form
            (login)="store.login($event)"
            [loginStatus]="vm.status"
          ></app-login-form>
          <ion-modal
            [isOpen]="vm.createModalIsOpen"
            [presentingElement]="routerOutlet.nativeEl"
            [canDismiss]="true"
            (ionModalDidDismiss)="store.setCreateModalOpen(false)"
          >
            <ng-template>
              <app-user-modal></app-user-modal>
            </ng-template>
          </ion-modal>
        </div>
      </ion-content>
      <ion-footer>
        <ion-button
          expand="full"
          data-test="open-create-button"
          (click)="store.setCreateModalOpen(true)"
        >
          Create Account
        </ion-button>
      </ion-footer>
    </ng-container>
  `,
  styles: [
    `
      ion-content {
        --background: linear-gradient(
          62deg,
          var(--ion-color-primary) 0%,
          var(--ion-color-secondary) 100%
        );
      }

      ion-footer {
        background: linear-gradient(
          242deg,
          var(--ion-color-primary) 0%,
          var(--ion-color-secondary) 100%
        );
      }

      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          padding: 2rem;
          filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public vm$ = combineLatest([
    this.store.status$,
    this.store.createModalIsOpen$,
  ]).pipe(
    map(([status, createModalIsOpen]) => ({ status, createModalIsOpen }))
  );

  constructor(
    public store: LoginStore,
    protected routerOutlet: IonRouterOutlet
  ) {}
}

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];
