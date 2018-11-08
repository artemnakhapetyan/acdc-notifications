import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcdcNotificationsComponent } from './acdc-notifications.component';
import { AcdcNotificationsService } from './acdc-notifications.service';
import { AcdcNotifcationsDefaultConfig } from './acdc-notifications.model';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AcdcNotificationsComponent],
  exports: [AcdcNotificationsComponent]
})
export class AcdcNotificationsModule { 
  static forRoot(defaultConfig?: AcdcNotifcationsDefaultConfig): ModuleWithProviders {
      return {
        ngModule: AcdcNotificationsModule,
        providers: [AcdcNotificationsService, {provide: AcdcNotifcationsDefaultConfig, useValue: defaultConfig}]
      }
  }
}
