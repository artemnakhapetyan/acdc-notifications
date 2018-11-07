import { TestBed, inject } from '@angular/core/testing';

import { AcdcNotificationsService } from './acdc-notifications.service';

describe('AcdcNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcdcNotificationsService]
    });
  });

  it('should be created', inject([AcdcNotificationsService], (service: AcdcNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
