import { Injectable } from '@angular/core';
import { AcdcNotificationsComponent } from './acdc-notifications.component';

import { AcdcToast, AcdcNotificationLevel, AcdcNotificationState } from './acdc-notifications.model';

@Injectable()
export class AcdcNotificationsService {

  private counter: number = 0;

  private toasts: AcdcToast[] = [];

  constructor() { }

  private generateId(): string{
    return 'acdc_' + ( Date.now() + Math.random() );
  }

  private addToast(notificationLevel: AcdcNotificationLevel, title: string, message: string, timeout?: number): string{

    const newToast: AcdcToast = {
      id: this.generateId(),
      title: title,
      message: message,
      notificationLevel: notificationLevel,
      timeout: timeout,
      notificationState: AcdcNotificationState.Created
    };
    this.toasts.push(newToast);

    if(timeout){
      setTimeout( () => {
        this.delete(newToast.id);
      }, timeout);
    }

    return newToast.id;

  }

  getToastsRef(){
    return this.toasts;
  }

  toastSuccess(title: string, message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Success,
      title,
      message,
      timeout
    );
  }

  toastError(title: string, message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Error,
      title,
      message,
      timeout
    );
  }

  toastInfo(title: string, message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Info,
      title,
      message,
      timeout
    );
  }

  toastWarn(title: string, message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Warn,
      title,
      message,
      timeout
    );
  }

  miniToastSuccess(message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Success,
      null,
      message,
      timeout
    );
  }

  miniToastError(message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Error,
      null,
      message,
      timeout
    );
  }

  miniToastInfo(message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Info,
      null,
      message,
      timeout
    );
  }

  miniToastWarn(message: string, timeout?: number): string{
    return this.addToast(
      AcdcNotificationLevel.Warn,
      null,
      message,
      timeout
    );
  }

  delete(id: string){

    let index = this.toasts.findIndex( item => item.id === id );
    if(index===-1){
      return;
    }

    const toast2Dismiss = this.toasts[index];
    toast2Dismiss.notificationState = AcdcNotificationState.Dismissed;

    setTimeout( () => {
      index = this.toasts.findIndex( item => item.id === id );
      if(index===-1){
        return;
      }
      this.toasts.splice(index, 1);
    }, 500);

  }

}
