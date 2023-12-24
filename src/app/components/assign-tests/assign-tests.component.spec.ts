import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTestsComponent } from './assign-tests.component';

describe('AssignTestsComponent', () => {
  let component: AssignTestsComponent;
  let fixture: ComponentFixture<AssignTestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignTestsComponent]
    });
    fixture = TestBed.createComponent(AssignTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
