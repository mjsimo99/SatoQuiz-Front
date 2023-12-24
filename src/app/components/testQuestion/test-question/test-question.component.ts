import { Component, OnInit } from '@angular/core';
import { TestQuestionService } from 'src/app/services/testQuestion/test-question.service';
import { TestQuestion } from 'src/app/models/TestQuestion/test-question';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question/question';
import { QuestionService } from 'src/app/services/question/question.service';
import { TestService } from 'src/app/services/test/test.service';
import { Test } from 'src/app/models/test/test';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.css']
})
export class TestQuestionComponent implements OnInit {
  testQuestions: TestQuestion[] = [];
  newTestQuestion!: FormGroup;
  showModal = false;
  editMode = false;
  editingTestQuestion: TestQuestion | null = null;
  questions: Question[] = [];
  tests: Test[] = [];

  constructor(
    private testQuestionService: TestQuestionService, 
    private questionService: QuestionService,
    private testService: TestService,
    private formBuilder: FormBuilder
    ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchTestQuestions();
    this.fetchQuestions();
    this.fetchTests();
  }

  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingTestQuestion = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editTestQuestion(testQuestion: TestQuestion) {
    this.editMode = true;
    this.editingTestQuestion = testQuestion;

    this.newTestQuestion.setValue({
      temporize: testQuestion.temporize,
    });

    this.openModal();
  }

  fetchTestQuestions() {
    this.testQuestionService.getAllTestQuestions().subscribe(
      (data) => {
        this.testQuestions = data;
      },
      (error) => {
        console.error('Error fetching test questions:', error);
      }
    );
  }

  fetchQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
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

  createForm() {
    this.newTestQuestion = this.formBuilder.group({
      test: this.formBuilder.group({
        testId: [null, Validators.required]  
      }),
      question: this.formBuilder.group({
        questionId: [null, Validators.required] 
      }),
      temporize: [null, Validators.required] 
    });
  }

  resetForm() {
    this.newTestQuestion.reset();
    this.editMode = false;
    this.editingTestQuestion = null;
  }

  addTestQuestion() {
    this.testQuestionService.addTestQuestion(this.newTestQuestion.value).subscribe(
      (data) => {
        this.testQuestions.push(data);
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('Test question added successfully!');
      },
      (error) => {
        console.error('Error adding test question:', error);
        this.showErrorAlert('Error adding test question!');
      }
    );
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
