import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoListComponent } from './convo-list.component';

describe('ConvoListComponent', () => {
  let component: ConvoListComponent;
  let fixture: ComponentFixture<ConvoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvoListComponent]
    });
    fixture = TestBed.createComponent(ConvoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
