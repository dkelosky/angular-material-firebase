import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../interface/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly MAX = 10;
  count: BehaviorSubject<number>;
  messagesValues: Message[];
  messages: BehaviorSubject<Message[]>;
  constructor(
    private afMessaging: AngularFireMessaging,
  ) {
    this.count = new BehaviorSubject<number>(0);
    this.messagesValues = [];
    this.messages = new BehaviorSubject<Message[]>(this.messagesValues);

    this.afMessaging.messages.subscribe((message: Message) => {
    console.log(`Got message ${JSON.stringify(message, null, 2)}`);
      const val = this.count.getValue() + 1;
      this.count.next(val);

      if (this.messagesValues.length > this.MAX) {
        this.messagesValues.pop();
      }
      this.messagesValues.unshift(message);
      this.messages.next(this.messagesValues);
    });
  }

  resetCountSeen() {
    this.count.next(0);
  }
}
