import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  Firestore,
  limit,
} from '@angular/fire/firestore';
import { collection, orderBy, query } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
import { IMessage } from '../interfaces/message.interface';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private firestore: Firestore) {}

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
    const newMessage: IMessage = {
      author: 'test@gmail.com',
      content: message,
      created: Date.now().toString(),
    };
    const msgCollection = collection(this.firestore, 'messages');
    addDoc(msgCollection, newMessage);
  }
}
