import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from 'src/app/state/state/app.state';
import * as AssignTestActions from 'src/app/state/actions/assign-test.actions';
import * as AssignTestSelectors from 'src/app/state/selectors/assign-test.selectors';
import * as StudentActions from 'src/app/state/actions/student.actions';
import * as StudentSelectors from 'src/app/state/selectors/student.selectors';
import * as TestActions from 'src/app/state/actions/test.actions';
import * as TestSelectors from 'src/app/state/selectors/test.selectors';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';
import { Student } from 'src/app/models/student/student';
import { Test } from 'src/app/models/test/test';
import { AssignTestService } from 'src/app/services/assignTest/assign-test.service';
import { ReponseService } from 'src/app/services/reponse/reponse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-tests',
  templateUrl: './assign-tests.component.html',
  styleUrls: ['./assign-tests.component.css']
})
export class AssignTestsComponent implements OnInit {
  assignTests: AssignTest[] = [];
  newAssignTest!: FormGroup;
  showModal = false;
  editMode = false;
  editingAssignTest: AssignTest | null = null;
  students: Student[] = [];
  tests: Test[] = [];
  assignTests$: Observable<AssignTest[]>;
  student$: Observable<Student[]>;
  test$: Observable<Test[]>;

  constructor(
    private assignTestService: AssignTestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private reponseService: ReponseService,
    private store: Store<AppState>
  ) { 
    this.createForm();
    this.assignTests$ = this.store.pipe(select(AssignTestSelectors.selectAssignTests));
    this.student$ = this.store.pipe(select(StudentSelectors.selectStudents));
    this.test$ = this.store.pipe(select(TestSelectors.selectTests));
  }

  ngOnInit(): void {
    this.initializeObservables();
    this.fetchData();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editMode = false;
    this.editingAssignTest = null;
  }

  fetchStudents(): void {
    this.store.dispatch(StudentActions.loadStudents());
  }

  fetchTests(): void {
    this.store.dispatch(TestActions.loadTests());
  }

  fetchAssignTests(): void {
    this.store.dispatch(AssignTestActions.loadAssignTests());
  }

  createForm(): void {
    this.newAssignTest = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      raison: [''],
      finalResult: [0, Validators.required],
      attemptNumber: ['', Validators.required],
      student: this.formBuilder.group({
        studentId: ['', Validators.required],
      }),
      test: this.formBuilder.group({
        testId: ['', Validators.required],
      }),
    });
  }

  editAssignTest(assignTest: AssignTest): void {
    this.editMode = true;
    this.editingAssignTest = assignTest;
    this.populateForm(assignTest);
    this.openModal();
  }

  addAssignTest(): void {
    this.dispatchAddAssignTest();
    this.closeAndResetForm('Assign Test added successfully!');
    this.fetchAssignTests();
  }

  updateAssignTest(): void {
    const assignTestToUpdate = this.editingAssignTest;
    if (assignTestToUpdate && assignTestToUpdate.assignTestId !== undefined) {
      const updatedAssignTest: Partial<AssignTest> = { ...assignTestToUpdate, ...this.newAssignTest.value };
      this.dispatchUpdateAssignTest(assignTestToUpdate.assignTestId, updatedAssignTest);
      this.closeModalAndResetForm('Assign Test updated successfully!');
    } else {
      console.error('AssignTest to update or AssignTestId is undefined');
    }
  }

  deleteAssignTest(assignTest: AssignTest): void {
    if (assignTest.assignTestId) {
      this.dispatchDeleteAssignTest(assignTest.assignTestId);
      this.showSuccessAlert('Assign Test deleted successfully!');
    }
  }

  resetForm(): void {
    this.newAssignTest.reset();
  }

  private initializeObservables(): void {
    this.assignTests$ = this.store.pipe(select(AssignTestSelectors.selectAssignTests));
    this.student$ = this.store.pipe(select(StudentSelectors.selectStudents));
    this.test$ = this.store.pipe(select(TestSelectors.selectTests));
  }

  private fetchData(): void {
    this.store.dispatch(AssignTestActions.loadAssignTests());
    this.store.dispatch(StudentActions.loadStudents());
    this.store.dispatch(TestActions.loadTests());

    this.assignTests$.subscribe(assignTests => this.assignTests = assignTests);
    this.student$.subscribe(students => this.students = students);
    this.test$.subscribe(tests => this.tests = tests);
  }

  private populateForm(assignTest: AssignTest): void {
    this.newAssignTest.patchValue({
      startDate: assignTest.startDate,
      endDate: assignTest.endDate,
      raison: assignTest.raison,
      finalResult: assignTest.finalResult,
      attemptNumber: assignTest.attemptNumber,
      student: { studentId: assignTest.student.studentId },
      test: { testId: assignTest.test.testId },
    });
  }

  private dispatchAddAssignTest(): void {
    this.store.dispatch(AssignTestActions.addAssignTest({ assignTest: this.newAssignTest.value }));
  }

  private dispatchUpdateAssignTest(assignTestId: number, updatedAssignTest: Partial<AssignTest>): void {
    const updateAssignTestAction = AssignTestActions.updateAssignTest({
      assignTest: {
        assignTestId: assignTestId,
        data: updatedAssignTest,
      },
    });
    this.store.dispatch(updateAssignTestAction);
  }

  private dispatchDeleteAssignTest(assignTestId: number): void {
    this.store.dispatch(AssignTestActions.deleteAssignTest({ assignTestId: assignTestId }));
  }

  private closeAndResetForm(successMessage: string): void {
    this.closeModal();
    this.resetForm();
    this.showSuccessAlert(successMessage);
  }

  private closeModalAndResetForm(successMessage: string): void {
    this.newAssignTest.reset();
    this.closeModal();
    this.showSuccessAlert(successMessage);
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

  private showAlert(title: string, text: string, icon: any): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok',
    });
  }

  startQuiz(testId: number, assignTestId: number, attemptNumber: number): void {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    const assignTest = this.assignTests.find(test => test.assignTestId === assignTestId);

    if (assignTest) {
      const startDate = new Date(assignTest.startDate).getTime();
      const endDate = new Date(assignTest.endDate).getTime();

      if (currentTimestamp >= startDate && currentTimestamp <= endDate) {
        this.handleQuizStart(assignTestId, attemptNumber, testId);
      } else {
        this.showAlert('Invalid Time', 'The quiz cannot be started at the current time.', 'error');
      }
    }
  }

  private handleQuizStart(assignTestId: number, attemptNumber: number, testId: number): void {
    this.reponseService.deleteAllResponses(assignTestId).subscribe(
      () => {
        console.log('Responses deleted successfully.');

        this.assignTestService.updateAttemptNumber(assignTestId, attemptNumber - 1).subscribe(
          () => {
            console.log('Attempt number updated successfully.');
            const quizUrl = `/start-quiz/${testId}/${assignTestId}`;
            this.router.navigate([quizUrl]);
          },
          (updateError) => {
            console.error('Error updating Attempt Number:', updateError);
          }
        );
      },
      (deleteError) => {
        console.error('Error deleting responses:', deleteError);
      }
    );
  }
}
