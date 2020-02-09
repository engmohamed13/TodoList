import { Injectable, EventEmitter } from '@angular/core';
import { NotificationType } from '../components/notification/notification.component';

@Injectable({ 
    providedIn: 'root'
})
export class NotificationService {

    public showNotificationEvent = new EventEmitter<any>();
    public hideNotificationEvent = new EventEmitter<any>();

    constructor() { }

    showNotification(message: string, type: NotificationType) {
    
        this.showNotificationEvent.emit({ message: message, type: type });
    }

    hideNotification() {
        this.hideNotificationEvent.emit();
    }
}