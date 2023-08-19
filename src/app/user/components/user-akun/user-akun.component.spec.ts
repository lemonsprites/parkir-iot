import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAkunComponent } from './user-akun.component';

describe('UserAkunComponent', () => {
  let component: UserAkunComponent;
  let fixture: ComponentFixture<UserAkunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAkunComponent]
    });
    fixture = TestBed.createComponent(UserAkunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
