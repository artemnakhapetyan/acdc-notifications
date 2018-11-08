import { Component, OnInit } from '@angular/core';

import { AcdcToast, AcdcNotifcationsDefaultConfig, AcdcToastsDefaultConfig, AcdcToastNotifcationLevelConfig } from './acdc-notifications.model';

import { AcdcNotificationsService } from './acdc-notifications.service';

@Component({
  selector: 'acdc-notifications',
  templateUrl: './acdc-notifications.component.html',
  styleUrls: [ './acdc-notifications.component.css' ]
})
export class AcdcNotificationsComponent implements OnInit {

  toasts: AcdcToast[];

  acdcConfig: AcdcNotifcationsDefaultConfig;

  private setEmptyConfigDefaults(defaultConfig: AcdcNotifcationsDefaultConfig): AcdcNotifcationsDefaultConfig{
    if(!defaultConfig){
      defaultConfig = {} as AcdcNotifcationsDefaultConfig;
    }
    if(!defaultConfig.toast){
      defaultConfig.toast = {} as AcdcToastsDefaultConfig;
    }
    if(!defaultConfig.toast.error){
      defaultConfig.toast.error = {} as AcdcToastNotifcationLevelConfig;
    }
    if(!defaultConfig.toast.info){
      defaultConfig.toast.info = {} as AcdcToastNotifcationLevelConfig;
    }
    if(!defaultConfig.toast.warn){
      defaultConfig.toast.warn = {} as AcdcToastNotifcationLevelConfig;
    }
    if(!defaultConfig.toast.success){
      defaultConfig.toast.success = {} as AcdcToastNotifcationLevelConfig;
    }
    if(defaultConfig.toast.titleColor){
      if(!defaultConfig.toast.info.titleColor){
        defaultConfig.toast.info.titleColor = defaultConfig.toast.titleColor;
      }
      if(!defaultConfig.toast.error.titleColor){
        defaultConfig.toast.error.titleColor = defaultConfig.toast.titleColor;
      }
      if(!defaultConfig.toast.warn.titleColor){
        defaultConfig.toast.warn.titleColor = defaultConfig.toast.titleColor;
      }
      if(!defaultConfig.toast.success.titleColor){
        defaultConfig.toast.success.titleColor = defaultConfig.toast.titleColor;
      }
    }
    if(defaultConfig.toast.messageColor){
      if(!defaultConfig.toast.info.messageColor){
        defaultConfig.toast.info.messageColor = defaultConfig.toast.messageColor;
      }
      if(!defaultConfig.toast.error.messageColor){
        defaultConfig.toast.error.messageColor = defaultConfig.toast.messageColor;
      }
      if(!defaultConfig.toast.warn.messageColor){
        defaultConfig.toast.warn.messageColor = defaultConfig.toast.messageColor;
      }
      if(!defaultConfig.toast.success.messageColor){
        defaultConfig.toast.success.messageColor = defaultConfig.toast.messageColor;
      }
    }
    if(defaultConfig.toast.iconsColor){
      if(!defaultConfig.toast.info.iconsColor){
        defaultConfig.toast.info.iconsColor = defaultConfig.toast.iconsColor;
      }
      if(!defaultConfig.toast.error.iconsColor){
        defaultConfig.toast.error.iconsColor = defaultConfig.toast.iconsColor;
      }
      if(!defaultConfig.toast.warn.iconsColor){
        defaultConfig.toast.warn.iconsColor = defaultConfig.toast.iconsColor;
      }
      if(!defaultConfig.toast.success.iconsColor){
        defaultConfig.toast.success.iconsColor = defaultConfig.toast.iconsColor;
      }
    }
    if(defaultConfig.toast.backgroundColor){
      if(!defaultConfig.toast.info.backgroundColor){
        defaultConfig.toast.info.backgroundColor = defaultConfig.toast.backgroundColor;
      }
      if(!defaultConfig.toast.error.backgroundColor){
        defaultConfig.toast.error.backgroundColor = defaultConfig.toast.backgroundColor;
      }
      if(!defaultConfig.toast.warn.backgroundColor){
        defaultConfig.toast.warn.backgroundColor = defaultConfig.toast.backgroundColor;
      }
      if(!defaultConfig.toast.success.backgroundColor){
        defaultConfig.toast.success.backgroundColor = defaultConfig.toast.backgroundColor;
      }
    }
    return defaultConfig;
  }

  constructor(private acdcNotificationsService: AcdcNotificationsService, private defaultConfig:AcdcNotifcationsDefaultConfig) {
    
    this.acdcConfig = this.setEmptyConfigDefaults(defaultConfig);
    
  }

  ngOnInit() {
    this.toasts = this.acdcNotificationsService.getToastsRef();
  }

  dismissToast(id: string) {
    this.acdcNotificationsService.deleteToast(id);
  }

}
