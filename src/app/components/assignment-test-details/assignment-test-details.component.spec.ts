import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTestDetailsComponent } from './assignment-test-details.component';

describe('AssignmentTestDetailsComponent', () => {
  let component: AssignmentTestDetailsComponent;
  let fixture: ComponentFixture<AssignmentTestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentTestDetailsComponent]
    });
    fixture = TestBed.createComponent(AssignmentTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
