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
import { passwordMatchesValidator } from '@my-org/chat/core/validators';

@Component({
  selector: 'my-org-user-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" #form="ngForm">
      <ion-item lines="none">
        <ion-icon color="light" slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-note
        color="danger"
        *ngIf="
          (userForm.controls.email.dirty || form.submitted) &&
          !userForm.controls.email.valid
        "
      >
        Please provide a valid email
      </ion-note>
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
      <ion-note
        color="danger"
        *ngIf="
          (userForm.controls.password.dirty || form.submitted) &&
          !userForm.controls.password.valid
        "
      >
        Password must be at least 8 characters long
      </ion-note>
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
      <ion-note
        color="danger"
        *ngIf="
          (userForm.controls.confirmPassword.dirty || form.submitted) &&
          userForm.hasError('passwordMatch')
        "
      >
        Must match password field
      </ion-note>
      <ion-note color="danger" *ngIf="userStatus === 'error'">
        Could not create account with those details.
      </ion-note>
      <ion-button
        type="submit"
        expand="full"
        [disabled]="userStatus === 'creating'"
      >
        <ion-spinner *ngIf="userStatus === 'creating'"></ion-spinner>
        Submit
      </ion-button>
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

  public userForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
      validators: [passwordMatchesValidator],
    }
  );

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    if (this.userForm.valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...credentials } = this.userForm.getRawValue();
      this.user.emit(credentials);
    }
  }
}
