import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionService } from './../../services/question/question.service';
import { Question } from './../../models/question/question';
import { Media } from './../../models/media/media';
import Swal from 'sweetalert2';

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

  closeModal(): void {
    this.showModal = false;
    this.editMode = false;
    this.editingQuestion = null;
  }

  openModal(): void {
    this.showModal = true;
  }

  editQuestion(question: Question): void {
    this.editMode = true;
    this.editingQuestion = question;

    this.newQuestion.patchValue({
      answersNumber: question.answersNumber,
      answersNumberCorrect: question.answersNumberCorrect,
      text: question.text,
      type: question.type,
      scorePoints: question.scorePoints,
      subject: { ...question.subject },
      level: { ...question.level },
    });

    const mediaListFormArray = this.newQuestion.get('mediaList') as FormArray;
    mediaListFormArray.clear();
    question.mediaList.forEach(media => {
      mediaListFormArray.push(this.formBuilder.group({ ...media }));
    });

    this.openModal();
  }

  fetchQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        this.handleFetchError(error);
      }
    );
  }

  createForm(): void {
    this.newQuestion = this.formBuilder.group({
      answersNumber: ['', Validators.required],
      answersNumberCorrect: ['', Validators.required],
      text: ['', Validators.required],
      type: ['', Validators.required],
      scorePoints: ['', Validators.required],
      subject: this.formBuilder.group({
        id: ['', Validators.required],
        intitule: ['']
      }),
      level: this.formBuilder.group({
        id: ['', Validators.required],
        description: ['']
      }),
      mediaList: this.formBuilder.array([
        this.formBuilder.group({
          mediaId: [''],
          link: [''],
          type: ['']
        })
      ]),
    });
  }

  resetForm(): void {
    this.newQuestion.reset();
    this.editMode = false;
    this.editingQuestion = null;
  }

  addQuestion(): void {
    const mediaList = (this.newQuestion.get('mediaList') as FormArray).value as Media[];
    const newQuestion: Question = { ...this.newQuestion.value, mediaList };

    this.questionService.addQuestion(newQuestion).subscribe(
      (data) => {
        this.handleAddSuccess(data);
      },
      (error) => {
        this.handleAddError(error);
      }
    );
  }

  updateQuestion(): void {
    if (this.editingQuestion) {
      const mediaList = (this.newQuestion.get('mediaList') as FormArray).value as Media[];
      const updatedQuestion: Question = { ...this.editingQuestion, ...this.newQuestion.value, mediaList };

      this.questionService.updateQuestion(updatedQuestion.questionId ?? 0, updatedQuestion).subscribe(
        () => {
          this.handleUpdateSuccess();
        },
        (error) => {
          this.handleUpdateError(error);
        }
      );
    }
  }

  deleteQuestion(question: Question): void {
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
              this.handleDeleteSuccess();
            },
            (error) => {
              this.handleDeleteError(error);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showAlert('Cancelled', 'Question not deleted', 'error');
        }
      });
    }
  }

  // Helper Methods

  private handleFetchError(error: any): void {
    console.error('Error fetching questions:', error);
  }

  private handleAddSuccess(data: Question): void {
    this.questions.push(data);
    this.resetForm();
    this.closeModal();
    this.showSuccessAlert('Question added successfully!');
  }

  private handleAddError(error: any): void {
    console.error('Error adding question:', error);
    this.showErrorAlert('Error adding question!');
  }

  private handleUpdateSuccess(): void {
    this.fetchQuestions();
    this.resetForm();
    this.closeModal();
    this.showSuccessAlert('Question updated successfully!');
  }

  private handleUpdateError(error: any): void {
    console.error('Error updating question:', error);
    this.showErrorAlert('Error updating question!');
  }

  private handleDeleteSuccess(): void {
    this.fetchQuestions();
    this.resetForm();
    this.closeModal();
    this.showSuccessAlert('Question deleted successfully!');
  }

  private handleDeleteError(error: any): void {
    console.error('Error deleting question:', error);
    this.showErrorAlert('Error deleting question!');
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

  getMediaListControls(): any {
    return (this.newQuestion.get('mediaList') as FormArray).controls;
  }


  addMediaItem(): void {
    const mediaListFormArray = this.newQuestion.get('mediaList') as FormArray;
    mediaListFormArray.push(
      this.formBuilder.group({
        mediaId: [''],
        link: [''],
        type: ['']
      })
    );
  }
  
  removeMediaItem(index: number): void {
    const mediaListFormArray = this.newQuestion.get('mediaList') as FormArray;
    mediaListFormArray.removeAt(index);
  }
}
