import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  Firestore,
  limit,
} from '@angular/fire/firestore';
import { collection, orderBy, query } from '@firebase/firestore';
import { map, Observable, take } from 'rxjs';

import { IMessage } from '@my-org/chat/shared/interfaces';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  public getMessages() {
    const messages = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    );
    return collectionData(messages, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<IMessage[]>;
  }

  public addMessage(message: string) {
    this.authService.auth$.pipe(take(1)).subscribe((user) => {
      if (user?.email) {
        const newMessage: IMessage = {
          author: user.email,
          content: message,
          created: Date.now().toString(),
        };

        const messagesCollection = collection(this.firestore, 'messages');
        addDoc(messagesCollection, newMessage);
      }
    });
  }
}
