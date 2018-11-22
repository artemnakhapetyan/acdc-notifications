import { TestBed, inject } from '@angular/core/testing';

import { AcdcUtilsService } from './acdc-utils.service';

describe('AcdcUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcdcUtilsService]
    });
  });

  it('should be created', inject([AcdcUtilsService], (service: AcdcUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
