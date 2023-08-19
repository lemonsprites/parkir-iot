import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKelolaUserComponent } from './admin-kelola-user.component';

describe('AdminKelolaUserComponent', () => {
  let component: AdminKelolaUserComponent;
  let fixture: ComponentFixture<AdminKelolaUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminKelolaUserComponent]
    });
    fixture = TestBed.createComponent(AdminKelolaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
