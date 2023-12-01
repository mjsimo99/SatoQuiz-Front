import { Component, OnInit } from '@angular/core';
import { QuestionService } from './../../services/question/question.service';
import { Question } from './../../models/question/question';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  newQuestion!: FormGroup;
  showModal = false;
  editMode = false;
  editingQuestion: Question | null = null;

  constructor(private questionService: QuestionService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingQuestion = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editQuestion(question: Question) {
    this.editMode = true;
    this.editingQuestion = question;

    this.newQuestion.setValue({
      answersNumber: question.answersNumber,
      answersNumberCorrect: question.answersNumberCorrect,
      text: question.text,
      duration: question.duration,
      type: question.type,
      scorePoints: question.scorePoints,
      subject: { id: question.subject.id },
      level: { id: question.level.id },
      mediaList: question.mediaList || [],
    });

    this.openModal();
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

  createForm() {
    this.newQuestion = this.formBuilder.group({
      answersNumber: ['', Validators.required],
      answersNumberCorrect: ['', Validators.required],
      text: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['', Validators.required],
      scorePoints: ['', Validators.required],
      subject: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      level: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      mediaList: [[]],
    });
  }

  resetForm() {
    this.newQuestion.reset();
    this.editMode = false;
    this.editingQuestion = null;
  }

  addQuestion() {
    this.questionService.addQuestion(this.newQuestion.value).subscribe(
      (data) => {
        this.questions.push(data);
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('Question added successfully!');
      },
      (error) => {
        console.error('Error adding question:', error);
        this.showErrorAlert('Error adding question!');
      }
    );
  }

  updateQuestion() {
    if (this.editingQuestion) {
      this.questionService.updateQuestion(this.editingQuestion?.questionId || 0, this.newQuestion.value).subscribe(
        () => {
          this.fetchQuestions();
          this.resetForm();
          this.closeModal();
          this.showSuccessAlert('Question updated successfully!');
        },
        (error) => {
          console.error('Error updating question:', error);
          this.showErrorAlert('Error updating question!');
        }
      );
    }
  }

  deleteQuestion(question: Question) {
    console.log('Delete question:', question);
    const questionId = question.questionId;

    if (questionId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this question!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.questionService.deleteQuestion(questionId).subscribe(
            () => {
              this.fetchQuestions();
              this.resetForm();
              this.closeModal();
              this.showSuccessAlert('Question deleted successfully!');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showAlert('Cancelled', 'Question not deleted', 'error');
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
