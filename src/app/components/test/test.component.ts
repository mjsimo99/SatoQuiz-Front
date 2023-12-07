import { Component , OnInit } from '@angular/core';
import { TestService } from '../../services/test/test.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/test/test';
import { Teacher } from 'src/app/models/teacher/teacher';
import { TeacherService } from 'src/app/services/teacher/teacher.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  tests: Test[] = [];
  newTest!: FormGroup;
  showModal = false;
  editMode = false;
  editingTest: Test | null = null;
  teachers: Teacher[] = [];
  constructor(private testService: TestService, private teacherService: TeacherService, private formBuilder: FormBuilder) {
    this.createFrom();
  }
  
  ngOnInit(): void {
    this.fetchTests();
    this.fetchTeachers();
    console.log(this.fetchTests());
    
  }
  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingTest = null;
  }
  
  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }
  fetchTeachers() {
    this.teacherService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error('Error fetching teachers:', error);
      }
    );
  }
  fetchTests() {
    this.testService.getAllTests().subscribe(
      (data) => {
        this.tests = data;
      },
      (error) => {
        console.error('Error fetching tests:', error);
      }
    );
  }

  editTest(test: Test) {
    this.editingTest = test;
    this.editMode = true;
    this.showModal = true;
    this.newTest.patchValue({
      successScore: test.successScore,
      viewAnswer: test.viewAnswer,
      viewResult: test.viewResult,
      maxAttempt: test.maxAttempt,
      remark: test.remark,
      instructions: test.instructions,
      teacher: {
        teacherId: test.teacher.teacherId
      }
    });

    this.openModal();
  }

  createFrom() {
    this.newTest = this.formBuilder.group({
      successScore: ['', Validators.required],
      viewAnswer: ['', Validators.required],
      viewResult: ['', Validators.required],
      maxAttempt: ['', Validators.required],
      remark: ['', Validators.required],
      instructions: ['', Validators.required],
      teacher: this.formBuilder.group({
        teacherId: ['', Validators.required],
      }),
    });
  } 
  resetForm() {
    this.newTest.reset();
    this.editMode = false;
    this.editingTest = null;
  }


  addTest() {
    this.testService.addTest(this.newTest.value).subscribe(
      (data) => {
        this.tests.push(data);
        this.closeModal();
        this.showSuccessAlert('Test added successfully!');
      },
      (error) => {
        this.showErrorAlert('Error adding test!');
      }
    );
  }

  updateTest() {
    if (this.editingTest) {
      this.testService.updateTest(this.editingTest.testId, this.newTest.value).subscribe(
        (data) => {
          const index = this.tests.findIndex((test) => test.testId === data.testId);
          this.tests[index] = data;
          this.closeModal();
          this.showSuccessAlert('Test updated successfully!');
          this.resetForm();

        },
        (error) => {
          this.showErrorAlert('Error updating test!');
        }
      );
    }
  }

  deleteTest(test: Test) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.deleteTest(test.testId).subscribe(
          (data) => {
            this.tests = this.tests.filter((t) => t.testId !== test.testId);
            this.showAlert('Deleted!', 'Test deleted successfully!', 'success');
          },
          (error) => {
            this.showErrorAlert('Error deleting test!');
          }
        );
      }
    });
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
