import { MessageNotification } from './message-notification.interface';

export interface MessageData {
  topic: string;
}

export interface Message {
  data: MessageData;
  notification: MessageNotification;
}
