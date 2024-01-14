import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';
import { Student } from 'src/app/models/student/student';
import { Test } from 'src/app/models/test/test';
import { AssignTestService } from 'src/app/services/assignTest/assign-test.service';
import { ReponseService } from 'src/app/services/reponse/reponse.service';
import { AppState } from 'src/app/state/state/app.state';
import * as AssignTestActions from 'src/app/state/actions/assign-test.actions';
import * as AssignTestSelectors from 'src/app/state/selectors/assign-test.selectors';
import * as StudentActions from 'src/app/state/actions/student.actions';
import * as StudentSelectors from 'src/app/state/selectors/student.selectors';
import * as TestActions from 'src/app/state/actions/test.actions';
import * as TestSelectors from 'src/app/state/selectors/test.selectors';
import { AssignTestsComponent } from './assign-tests.component';

class MockAssignTestService {
  loadAssignTests(): Observable<AssignTest[]> {
    return of([]); 
  }

  addAssignTest(assignTest: any): Observable<any> {
    return of(assignTest); 
  }

  updateAssignTest(assignTestId: number, updatedAssignTest: Partial<AssignTest>): Observable<any> {
    return of({ assignTestId, updatedAssignTest }); 
  }

  deleteAssignTest(assignTestId: number): Observable<any> {
    return of(assignTestId); 
  }
}

class MockReponseService {
  deleteAllResponses(assignTestId: number): Observable<any> {
    return of(`Responses deleted for AssignTest with ID: ${assignTestId}`); 
  }
}

class MockStore {
  dispatch = jasmine.createSpy('dispatch');
  pipe(): Observable<any> {
    return of([]);
  }
}

describe('AssignTestsComponent', () => {
  let component: AssignTestsComponent;
  let fixture: ComponentFixture<AssignTestsComponent>;
  let assignTestService: MockAssignTestService;
  let reponseService: MockReponseService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignTestsComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        FormBuilder,
        { provide: AssignTestService, useClass: MockAssignTestService },
        { provide: ReponseService, useClass: MockReponseService },
        { provide: Store, useClass: MockStore }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTestsComponent);
    component = fixture.componentInstance;
    assignTestService = TestBed.inject(AssignTestService) as unknown as MockAssignTestService;
    reponseService = TestBed.inject(ReponseService) as MockReponseService;
    store = TestBed.inject(Store) as unknown as MockStore;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(component.showModal).toBe(false);
    expect(component.editMode).toBe(false);
    expect(component.editingAssignTest).toBe(null);
  });

  it('should fetch students', () => {
    component.fetchStudents();
    expect(store.dispatch).toHaveBeenCalledWith(StudentActions.loadStudents());
  });

  it('should fetch tests', () => {
    component.fetchTests();
    expect(store.dispatch).toHaveBeenCalledWith(TestActions.loadTests());
  });

  it('should fetch assign tests', () => {
    component.fetchAssignTests();
    expect(store.dispatch).toHaveBeenCalledWith(AssignTestActions.loadAssignTests());
  });

  it('should create the form', () => {
    component.createForm();
    expect(component.newAssignTest).toBeTruthy();
  });
});
