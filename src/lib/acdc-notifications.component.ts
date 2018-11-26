import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { 
  AcdcToast, 
  AcdcNotifcationsDefaultConfig, 
  AcdcToastsDefaultConfig, 
  AcdcToastNotifcationLevelConfig,
  AcdcVerticalAlignment,
  AcdcHorizontalAlignment
} from './acdc-notifications.model';

import { AcdcUtilsService } from './acdc-utils.service'; 
import { AcdcNotificationsService } from './acdc-notifications.service';

@Component({
  selector: 'acdc-notifications',
  templateUrl: './acdc-notifications.component.html',
  styleUrls: [ './acdc-notifications.component.css' ]
})
export class AcdcNotificationsComponent implements OnInit {

  @ViewChild('toastsDiv') private toastsDiv: ElementRef;

  toasts: AcdcToast[];

  acdcConfig: AcdcNotifcationsDefaultConfig;

  constructor(
    private acdcNotificationsService: AcdcNotificationsService, 
    private acdcUtils: AcdcUtilsService,
    private defaultConfig:AcdcNotifcationsDefaultConfig
  ) {
    this.acdcConfig = this.setEmptyConfigDefaults(defaultConfig);  
  }

  ngOnInit() {

    this.toasts = this.acdcNotificationsService.getToastsRef();

    this.acdcNotificationsService.addToastEmitter.subscribe( newToast => {

      setTimeout( () => {
        if(this.acdcConfig.toast.addToTop){
          this.toastsDiv.nativeElement.scrollTop = 0;
        }else{
          this.toastsDiv.nativeElement.scrollTop = this.toastsDiv.nativeElement.scrollHeight;
        }
      }, 100);
      
    });

    this.acdcNotificationsService.updateDefaultConfigEmitter.subscribe( defaultConfig => {
      this.acdcConfig = this.setEmptyConfigDefaults(defaultConfig); 
    });

  }

  dismissToast(id: string){
    this.acdcNotificationsService.deleteToast(id);
  }

  dismissAllToasts(){
    this.acdcNotificationsService.deleteAllToasts();
  }

  // private functions
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
    // setting default config for toasts title color if notification level specific toast title color is empty
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
    // setting default config for toasts message color if notification level specific toast message color is empty
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
    // setting default config for toasts icon color if notification level specific toast icon color is empty
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
    // setting config for toasts background color
    if(defaultConfig.toast.backgroundColor){
      // if default config fot toast background color not empty
      // notification level specific configuration background color has higher priority so first we are checking it
      // ( converting colors to rgba for opacity support )
      let toastRgbaBackgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.backgroundColor, defaultConfig.toast.backgroundOpacity);
      if(!defaultConfig.toast.info.backgroundColor){
        defaultConfig.toast.info.backgroundColor = toastRgbaBackgroundColor;
      }else{
        defaultConfig.toast.info.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.info.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
      if(!defaultConfig.toast.error.backgroundColor){
        defaultConfig.toast.error.backgroundColor = toastRgbaBackgroundColor;
      }else{
        defaultConfig.toast.error.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.error.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
      if(!defaultConfig.toast.warn.backgroundColor){
        defaultConfig.toast.warn.backgroundColor = toastRgbaBackgroundColor;
      }else{
        defaultConfig.toast.warn.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.warn.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
      if(!defaultConfig.toast.success.backgroundColor){
        defaultConfig.toast.success.backgroundColor = toastRgbaBackgroundColor;
      }else{
        defaultConfig.toast.success.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.success.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
    }else{
      // if default config fot toast background color is empty
      // we are checking notification level specific configuration background color, if it is empty then using default values
      // ( converting colors to rgba for opacity support )
      if(!defaultConfig.toast.info.backgroundColor){
        defaultConfig.toast.info.backgroundColor = this.acdcUtils.color2Rgba('steelblue', defaultConfig.toast.backgroundOpacity);
      }else{
        defaultConfig.toast.info.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.info.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
      if(!defaultConfig.toast.error.backgroundColor){
        defaultConfig.toast.error.backgroundColor = this.acdcUtils.color2Rgba('firebrick', defaultConfig.toast.backgroundOpacity);
      }else{
        defaultConfig.toast.error.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.error.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
      if(!defaultConfig.toast.warn.backgroundColor){
        defaultConfig.toast.warn.backgroundColor = this.acdcUtils.color2Rgba('orange', defaultConfig.toast.backgroundOpacity);
      }else{
        defaultConfig.toast.warn.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.warn.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
      if(!defaultConfig.toast.success.backgroundColor){
        defaultConfig.toast.success.backgroundColor = this.acdcUtils.color2Rgba('seagreen', defaultConfig.toast.backgroundOpacity);
      }else{
        defaultConfig.toast.success.backgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.success.backgroundColor, defaultConfig.toast.backgroundOpacity);
      }
    }

    if(!defaultConfig.toast.deleteAllBtnBackgroundColor){
      defaultConfig.toast.deleteAllBtnBackgroundColor = this.acdcUtils.color2Rgba('steelblue', defaultConfig.toast.backgroundOpacity);
    }else{
      if(defaultConfig.toast.deleteAllBtnBackgroundColor!=='transparent' && defaultConfig.toast.deleteAllBtnBackgroundColor!=='none'){
        defaultConfig.toast.deleteAllBtnBackgroundColor = this.acdcUtils.color2Rgba(defaultConfig.toast.deleteAllBtnBackgroundColor, defaultConfig.toast.backgroundOpacity);
      }
    }

    if(!defaultConfig.toast.verticalAlignment){
      defaultConfig.toast.verticalAlignment = AcdcVerticalAlignment.Top;
    }
    if(!defaultConfig.toast.horizontalAlignment){
      defaultConfig.toast.horizontalAlignment = AcdcHorizontalAlignment.Right;
    }

    if(!defaultConfig.toast.createAnimations){
      defaultConfig.toast.createAnimations = 'acdcFadeInAnimation';
    }
    if(!defaultConfig.toast.dismissAnimations){
      defaultConfig.toast.dismissAnimations = 'acdcFadeOutAnimation';
    }

    return defaultConfig;
  }

}
