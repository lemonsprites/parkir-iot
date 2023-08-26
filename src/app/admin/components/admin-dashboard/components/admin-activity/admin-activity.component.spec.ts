import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityComponent } from './admin-activity.component';

describe('AdminActivityComponent', () => {
  let component: AdminActivityComponent;
  let fixture: ComponentFixture<AdminActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminActivityComponent]
    });
    fixture = TestBed.createComponent(AdminActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
