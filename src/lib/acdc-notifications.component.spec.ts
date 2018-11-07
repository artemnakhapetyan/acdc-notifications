import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcdcNotificationsComponent } from './acdc-notifications.component';

describe('AcdcNotificationsComponent', () => {
  let component: AcdcNotificationsComponent;
  let fixture: ComponentFixture<AcdcNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcdcNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcdcNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
