import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayananComponent } from './admin-layanan.component';

describe('AdminLayananComponent', () => {
  let component: AdminLayananComponent;
  let fixture: ComponentFixture<AdminLayananComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLayananComponent]
    });
    fixture = TestBed.createComponent(AdminLayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
