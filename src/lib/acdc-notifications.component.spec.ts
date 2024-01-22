import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcdcNotificationsComponent } from './acdc-notifications.component';

describe('AcdcNotificationsComponent', () => {
  let component: AcdcNotificationsComponent;
  let fixture: ComponentFixture<AcdcNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcdcNotificationsComponent]
    });
    fixture = TestBed.createComponent(AcdcNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
