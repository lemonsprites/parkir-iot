import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMonitorComponent } from './area-monitor.component';

describe('AreaMonitorComponent', () => {
  let component: AreaMonitorComponent;
  let fixture: ComponentFixture<AreaMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaMonitorComponent]
    });
    fixture = TestBed.createComponent(AreaMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
