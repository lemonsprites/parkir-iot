import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAkunComponent } from './admin-akun.component';

describe('AdminAkunComponent', () => {
  let component: AdminAkunComponent;
  let fixture: ComponentFixture<AdminAkunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAkunComponent]
    });
    fixture = TestBed.createComponent(AdminAkunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
