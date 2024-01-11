import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignTestService } from 'src/app/services/assignTest/assign-test.service';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';
import { StudentService } from 'src/app/services/student/student.service';
import { TestService } from 'src/app/services/test/test.service';
import { Student } from 'src/app/models/student/student';
import { Test } from 'src/app/models/test/test';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ReponseService } from 'src/app/services/reponse/reponse.service';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import { AppState } from 'src/app/state/state/app.state';
import * as AssignTestActions from 'src/app/state/actions/assign-test.actions';
import * as AssignTestSelectors from 'src/app/state/selectors/assign-test.selectors';



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


  constructor(
    private assignTestService: AssignTestService,
    private studentService: StudentService,
    private testService: TestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private reponseService: ReponseService,
    private store: Store<AppState>
    
  ) { this.createForm();
    this.assignTests$ = this.store.pipe(select(AssignTestSelectors.selectAssignTests));

  }
 ngOnInit(): void {

  this.store.dispatch(AssignTestActions.loadAssignTests());
  this.assignTests$.subscribe((assignTests) => {
    this.assignTests = assignTests;
  });
  

  this.fetchStudents();
  this.fetchTests();
}

  startQuiz(testId: number, assignTestId: number, attemptNumber: number): void {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
  
    const assignTest = this.assignTests.find(test => test.assignTestId === assignTestId);
  
    if (assignTest) {
      const startDate = new Date(assignTest.startDate).getTime();
      const endDate = new Date(assignTest.endDate).getTime();
  
      if (currentTimestamp >= startDate && currentTimestamp <= endDate) {
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
      } else {
        this.showAlert('Invalid Time', 'The quiz cannot be started at the current time.', 'error');
      }
    }
  }
  
  

  


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editMode = false;
    this.editingAssignTest = null;
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        console.log(this.students);
      },
      (error) => {
        console.error('Error fetching students:', error);
        console.log(this.students);
      }
    );
  }

  fetchTests() {
    this.testService.getAllTests().subscribe(
      (data) => {
        this.tests = data;
        console.log(this.tests);
      },
      (error) => {
        console.error('Error fetching tests:', error);
        console.log(this.tests);
      }
    );

  }

  fetchAssignTests(): void {
    this.store.dispatch(AssignTestActions.loadAssignTests());
    
  }

  createForm() {
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

    this.newAssignTest.patchValue({
      startDate: assignTest.startDate,
      endDate: assignTest.endDate,
      raison: assignTest.raison,
      finalResult: assignTest.finalResult,
      attemptNumber: assignTest.attemptNumber,
      student: {
        studentId: assignTest.student.studentId,
      },
      test: {
        testId: assignTest.test.testId,
      }
    });

    this.openModal();

  }
  addAssignTest(): void {
    this.store.dispatch(AssignTestActions.addAssignTest({ assignTest: this.newAssignTest.value }));
    this.closeModal();
    this.resetForm();
    this.showSuccessAlert('Assign Test added successfully!');
    this.fetchAssignTests();

    
  }
  
  updateAssignTest(): void {
    if (this.editingAssignTest) {
      const updatedAssignTest: AssignTest = {
        ...this.editingAssignTest,
        ...this.newAssignTest.value,
      };
      this.store.dispatch(AssignTestActions.updateAssignTest({ assignTest: updatedAssignTest }));
      this.closeModal();
      this.resetForm();
      this.showSuccessAlert('Assign Test updated successfully!');
    }
  }
  
  deleteAssignTest(assignTest: AssignTest): void {
    if (assignTest.assignTestId) {
      this.store.dispatch(AssignTestActions.deleteAssignTest({ assignTestId: assignTest.assignTestId }));
      this.showSuccessAlert('Assign Test deleted successfully!');
    }
  }

  resetForm(): void {
    this.newAssignTest.reset();
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
}