import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  message = '';

  setMessage(msg: string): void {
    this.message = msg;
  }

  clearMessage(): void {
    this.message = '';
  }
}
