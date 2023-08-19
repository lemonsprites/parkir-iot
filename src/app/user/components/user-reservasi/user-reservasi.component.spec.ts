import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservasiComponent } from './user-reservasi.component';

describe('UserReservasiComponent', () => {
  let component: UserReservasiComponent;
  let fixture: ComponentFixture<UserReservasiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReservasiComponent]
    });
    fixture = TestBed.createComponent(UserReservasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
