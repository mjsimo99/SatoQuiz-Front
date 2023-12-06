import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieStudentComponent } from './partie-student.component';

describe('PartieStudentComponent', () => {
  let component: PartieStudentComponent;
  let fixture: ComponentFixture<PartieStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartieStudentComponent]
    });
    fixture = TestBed.createComponent(PartieStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
