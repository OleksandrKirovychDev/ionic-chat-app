import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ICredentials } from '@my-org/chat/shared/interfaces';
import { TUserStatus } from '@my-org/chat/user/utils';

@Component({
  selector: 'my-org-user-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
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
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="confirmPassword"
          type="password"
          placeholder="confirm password"
        ></ion-input>
      </ion-item>
      <ion-button type="submit" expand="full">Submit</ion-button>
    </form>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }

      form {
        text-align: right;
      }

      ion-note {
        margin: 0 1rem 1rem 1rem;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFromComponent {
  @Input() userStatus!: TUserStatus;

  @Output() user = new EventEmitter<ICredentials>();

  public userForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    if (this.userForm.valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...credentials } = this.userForm.getRawValue();
      this.user.emit(credentials);
    }
  }
}
