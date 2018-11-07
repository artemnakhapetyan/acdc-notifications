import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcdcNotificationsComponent } from './acdc-notifications.component';
import { AcdcNotificationsService } from './acdc-notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AcdcNotificationsComponent],
  exports: [AcdcNotificationsComponent]
})
export class AcdcNotificationsModule { 
  static forRoot(): ModuleWithProviders {
      return {
        ngModule: AcdcNotificationsModule,
        providers: [AcdcNotificationsService]
      }
  }
}
