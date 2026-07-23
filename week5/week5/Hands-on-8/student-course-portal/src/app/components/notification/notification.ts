import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

// providers: [NotificationService] creates a new instance of NotificationService
// scoped only to this component and its children — not shared with the rest of the app.
// This is different from providedIn: 'root' which gives one singleton instance app-wide.
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService],
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {
    this.notificationService.setMessage('Welcome to the Student Course Portal!');
  }
}
