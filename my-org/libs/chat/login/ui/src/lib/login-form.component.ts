import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TLoginStatus } from '@my-org/chat/login/utils';
import { ICredentials } from '@my-org/chat/shared/interfaces';

@Component({
  selector: 'my-org-login-form',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <ion-item lines="none">
        <ion-icon color="light" slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="password"
          type="password"
          placeholder="password"
        ></ion-input>
      </ion-item>
      <ion-button type="submit" color="tertiary" expand="full">
        Login
      </ion-button>
    </form>
  `,
  styles: [
    `
      ion-badge {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() loginStatus!: TLoginStatus;
  @Output() login = new EventEmitter<ICredentials>();

  public loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    this.login.emit(this.loginForm.getRawValue());
  }
}
