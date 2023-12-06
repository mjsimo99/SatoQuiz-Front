import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validation } from 'src/app/models/validation/validation';
import { Answer } from 'src/app/models/answer/answer';
import { AnswerService } from '../../services/answer/answer.service';
import { Question } from 'src/app/models/question/question';
import { QuestionService } from 'src/app/services/question/question.service';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  validations: Validation[] = [];
  newValidation!: FormGroup;
  showModal = false;
  editMode = false;
  editingValidation: Validation | null = null;
  answers: Answer[] = [];
  questions: Question[] = [];

  

  constructor(private validationService: ValidationService, private answerService: AnswerService, private questionservice: QuestionService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchValidations();
    this.fetchAnswers(); 
    this.fetchQuestions();
    console.log(this.fetchValidations());
    

  }

  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingValidation = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }
  fetchQuestions() {
    this.questionservice.getAllQuestions().subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  fetchAnswers() {
    this.answerService.getAllAnswers().subscribe(
      (data) => {
        this.answers = data;
      },
      (error) => {
        console.error('Error fetching answers:', error);
      }
    );
  }

  editValidation(validation: Validation) {
    this.editMode = true;
    this.editingValidation = validation;
  
    this.newValidation.patchValue({
      answer: {
        answerId: validation.answer.answerId,
      },
      question: {
        questionId: validation.question.questionId,
      },
      points: validation.points,
    });
  
    this.openModal();
  }
  
  fetchValidations() {
    this.validationService.getAllValidations().subscribe(
      (data) => {
        this.validations = data;
        console.log(this.validations);
      },
      (error) => {
        console.error('Error fetching validations:', error);
      }
    );
  }

  createForm() {
    this.newValidation = this.formBuilder.group({
      answer: this.formBuilder.group({
        answerId: ['', Validators.required], // Assuming you need to select an answerId
      }),
      question: this.formBuilder.group({
        questionId: ['', Validators.required], // Assuming you need to select a questionId
      }),
      points: ['', Validators.required],
    });
  }

  resetForm() {
    this.newValidation.reset();
    this.editMode = false;
    this.editingValidation = null;
  }

  addValidation() {
    this.validationService.addValidation(this.newValidation.value).subscribe(
      (data) => {
        this.validations.push(data);
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('Validation added successfully!');
      },
      (error) => {
        if (error.status === 409) { 
          console.error('Validation already exists:', error);
          this.showErrorAlert('Validation already exists!');
        } else {
          console.error('Error adding validation:', error);
          this.showErrorAlert('Error adding validation!');
        }
      }
    );
  }
  
  updateValidation() {
    if (this.newValidation.valid) {
      const questionId = this.editingValidation?.question?.questionId ?? 0;
      const answerId = this.editingValidation?.answer?.answerId ?? 0;
  
      this.validationService.updateValidation(questionId, answerId, this.newValidation.value).subscribe(
        (data) => {
          // Replace the existing validation with the updated one
          this.validations = this.validations.map(v =>
            (v.question.questionId === questionId && v.answer.answerId === answerId) ? data : v
          );
  
          this.resetForm();
          this.closeModal();
          this.showSuccessAlert('Validation updated successfully!');
        },
        (error) => {
          console.error('Error updating validation:', error);
          this.showErrorAlert('Error updating validation!');
        }
      );
    } else {
      this.showAlert('Warning', 'Please fill out all the fields', 'warning');
    }
  }


  deleteValidation(validation: Validation) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const questionId = validation.question?.questionId ?? 0;
        const answerId = validation.answer?.answerId ?? 0;
  
        this.validationService.deleteValidation(questionId, answerId).subscribe(
          () => {
            this.fetchValidations();
            this.showSuccessAlert('Validation deleted successfully!');
          },
          (error: string) => {
            console.error('Error deleting validation:', error);
            this.showErrorAlert('Error deleting validation!');
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


