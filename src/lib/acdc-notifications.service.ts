import { Injectable } from '@angular/core';
import { AcdcNotificationsComponent } from './acdc-notifications.component';

import { AcdcToast, AcdcNotificationLevel, AcdcNotificationState, AcdcToastConfig } from './acdc-notifications.model';

@Injectable()
export class AcdcNotificationsService {

  private counter: number = 0;

  private toasts: AcdcToast[] = [];

  constructor() { }

  private generateId(): string{
    return 'acdc_' + ( Date.now() + Math.random() );
  }

  private addToast(notificationLevel: string, title: string, message: string, timeout?: number): string{

    const newToast: AcdcToast = {
      id: this.generateId(),
      title: title,
      message: message,
      notificationLevel: notificationLevel? AcdcNotificationLevel[notificationLevel]: AcdcNotificationLevel.Info,
      timeout: timeout,
      notificationState: AcdcNotificationState.Created
    };
    this.toasts.push(newToast);

    if(timeout){
      setTimeout( () => {
        this.deleteToast(newToast.id);
      }, timeout);
    }

    return newToast.id;

  }

  getToastsRef(){
    return this.toasts;
  }

  private toastParamsError(){
    return this.addToast(
      'Error',
      'Notifications Component Error',
      `'message' property is required when calling toast.`
    );
  }

  toast(config: AcdcToastConfig): string{
    if(!config){
      this.toastParamsError();
      return;
    }
    if(!config.message){
      this.toastParamsError();
      return;
    }
    return this.addToast(
      config.notificationLevel,
      config.title,
      config.message,
      config.timeout
    );
  }
  
  deleteAllToasts(){

    this.toasts.forEach( toast => {
      this.deleteToast(toast.id);
    });

  }

  deleteToast(id: string){

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
