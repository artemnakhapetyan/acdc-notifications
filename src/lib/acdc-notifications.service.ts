import { Injectable, EventEmitter, Output } from '@angular/core';

import { 
  AcdcToast, 
  AcdcNotifcationsDefaultConfig, 
  AcdcNotificationLevel, 
  AcdcNotificationState, 
  AcdcToastConfig 
} from './acdc-notifications.model';

@Injectable()
export class AcdcNotificationsService {

  @Output() addToastEmitter: EventEmitter<AcdcToast> = new EventEmitter();

  @Output() updateDefaultConfigEmitter: EventEmitter<AcdcNotifcationsDefaultConfig> = new EventEmitter();

  private counter: number = 0;

  private toasts: AcdcToast[] = [];

  private acdcConfig: AcdcNotifcationsDefaultConfig;

  constructor(private defaultConfig: AcdcNotifcationsDefaultConfig) {
    this.acdcConfig = defaultConfig;
  }

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

    if(this.acdcConfig && this.acdcConfig.toast && this.acdcConfig.toast.addToTop){
      this.toasts.unshift(newToast);
    }else{
      this.toasts.push(newToast);
    }
    this.addToastEmitter.emit(newToast);

    if(timeout){
      setTimeout( () => {
        this.deleteToast(newToast.id);
      }, timeout);
    }

    return newToast.id;

  }

  private toastParamsError(): string{
    return this.addToast(
      'Error',
      'Notifications Component Error',
      `'message' property is required when calling toast.`
    );
  }

  getToastsRef(){
    return this.toasts;
  }

  updateDefaultConfig(defaultConfig: AcdcNotifcationsDefaultConfig) {
    this.acdcConfig = defaultConfig;
    this.updateDefaultConfigEmitter.emit(defaultConfig);
  }

  toast(...params: any[]): string{

    if(params && params.length){
      
      if(typeof params[0] === 'string'){
        return this.addToast(
          params[2],
          params[1],
          params[0],
          params[3]
        );
      }else{
        let config: AcdcToastConfig = params[0] as AcdcToastConfig;
        return this.addToast(
          config.notificationLevel,
          config.title,
          config.message,
          config.timeout
        );
      }

    }

    return this.toastParamsError();

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
