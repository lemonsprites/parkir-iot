import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDukunganComponent } from './info-dukungan.component';

describe('InfoDukunganComponent', () => {
  let component: InfoDukunganComponent;
  let fixture: ComponentFixture<InfoDukunganComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDukunganComponent]
    });
    fixture = TestBed.createComponent(InfoDukunganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
