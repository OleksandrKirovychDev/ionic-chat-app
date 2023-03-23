import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { IMessage } from '@my-org/chat/shared/interfaces';

@Component({
  standalone: true,
  selector: 'app-message-list',
  imports: [CommonModule, IonicModule],
  template: `
    <ion-list lines="none">
      <ion-item *ngFor="let message of messages; trackBy: trackByFn">
        <ion-avatar class="animate-in-primary"></ion-avatar>
        <div class="chat-message animate-in-secondary">
          <ion-note>{{ message.author }}</ion-note>
          <p>{{ message.content }}</p>
        </div>
      </ion-item>
    </ion-list>
  `,
  styles: [
    `
      .chat-message,
      ion-avatar {
        filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
      }

      .chat-message {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin: 10px 0;
        background-color: var(--ion-color-light);

        p {
          margin: 5px 0;
        }
      }
    `,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  @Input() messages!: IMessage[];

  public trackByFn(index: number, message: IMessage) {
    return message.created;
  }
}