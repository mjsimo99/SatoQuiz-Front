import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../../services/answer/answer.service';
import { Answer } from '../../models/answer/answer';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answers: Answer[] = [];
  newAnswer!: FormGroup;
  showModal = false;
  editMode = false;
  editingAnswer: Answer | null = null;

  constructor(private answerService: AnswerService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchAnswers();
  }

  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingAnswer = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editAnswer(answer: Answer) {
    this.editMode = true;
    this.editingAnswer = answer;

    this.newAnswer.setValue({
      answerText: answer.answerText,
      });

    this.openModal();
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


  createForm() {
    this.newAnswer = this.formBuilder.group({
      answerText: ['', Validators.required],
    });
  }

  resetForm() {
    this.newAnswer.reset();
    this.editMode = false;
    this.editingAnswer = null;
  }


  addAnswer() {
    this.answerService.addAnswer(this.newAnswer.value).subscribe(
      (data) => {
        this.answers.push(data);
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('Answer added successfully!');
      },
      (error) => {
        console.error('Error adding answer:', error);
        this.showErrorAlert('Error adding answer!');
      }
    );
  }

  updateAnswer() {
    if (this.editingAnswer) {
      this.answerService.updateAnswer(this.editingAnswer?.answerId || 0, this.newAnswer.value).subscribe(
        () => {
          this.fetchAnswers();
          this.resetForm();
          this.closeModal();
          this.showSuccessAlert('Answer updated successfully!');
        },
        (error) => {
          console.error('Error updating answer:', error);
          this.showErrorAlert('Error updating answer!');
        }
      );
    }
  }

  deleteAnswer(answer: Answer) {
    console.log('Delete answer:', answer);
    const answerId = answer.answerId;

    if (answerId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this answer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.answerService.deleteAnswer(answerId).subscribe(
            () => {
              this.fetchAnswers();
              this.resetForm();
              this.closeModal();
              this.showSuccessAlert('Answer deleted successfully!');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showAlert('Cancelled', 'Answer not deleted', 'error');
        }
      });
    }
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