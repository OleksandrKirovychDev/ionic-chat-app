import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  template: `
    <ion-toolbar>
      <ion-textarea
        [formControl]="messageControl"
        placeholder="type message..."
      ></ion-textarea>
      <ion-buttons slot="primary">
        <ion-button (click)="sendMessage()">
          <ion-icon name="send" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  styles: [
    `
      ion-textarea {
        font-size: 1.2em !important;
        --padding-top: 25px;
        --padding-start: 15px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Output() send = new EventEmitter<string>();

  public messageControl = new FormControl('');

  public sendMessage() {
    if (this.messageControl.value) {
      this.send.emit(this.messageControl.value);
      this.messageControl.reset();
    }
  }
}
