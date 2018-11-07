import { Component, OnInit } from '@angular/core';

import { AcdcToast } from './acdc-notifications.model';

import { AcdcNotificationsService } from './acdc-notifications.service';

@Component({
  selector: 'acdc-notifications',
  templateUrl: './acdc-notifications.component.html',
  styleUrls: [ './acdc-notifications.component.css' ]
})
export class AcdcNotificationsComponent implements OnInit {

  toasts: AcdcToast[];

  constructor(private acdcNotificationsService: AcdcNotificationsService) { }

  ngOnInit() {
    this.toasts = this.acdcNotificationsService.getToastsRef();
  }

  dismissToast(id: string) {
    this.acdcNotificationsService.deleteToast(id);
  }

}
