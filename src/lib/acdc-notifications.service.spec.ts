import { TestBed } from '@angular/core/testing';

import { AcdcNotificationsService } from './acdc-notifications.service';

describe('AcdcNotificationsService', () => {
  let service: AcdcNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcdcNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
