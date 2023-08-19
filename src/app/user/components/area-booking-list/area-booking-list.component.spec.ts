import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaBookingListComponent } from './area-booking-list.component';

describe('AreaBookingListComponent', () => {
  let component: AreaBookingListComponent;
  let fixture: ComponentFixture<AreaBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaBookingListComponent]
    });
    fixture = TestBed.createComponent(AreaBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
