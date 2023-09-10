import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBookingComponent } from './activity-booking.component';

describe('ActivityBookingComponent', () => {
  let component: ActivityBookingComponent;
  let fixture: ComponentFixture<ActivityBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityBookingComponent]
    });
    fixture = TestBed.createComponent(ActivityBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
