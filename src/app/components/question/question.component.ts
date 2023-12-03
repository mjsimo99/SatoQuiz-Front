import { Component, OnInit } from '@angular/core';
import { QuestionService } from './../../services/question/question.service';
import { Question } from './../../models/question/question';
import { Media } from './../../models/media/media';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  newMedia!: FormGroup;
  

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
      type: question.type,
      scorePoints: question.scorePoints,
      subject: { id: question.subject.id, intitule: question.subject.intitule },
      level: { id: question.level.id, description: question.level.description },
      mediaList: []
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
      mediaList: this.formBuilder.array([])  // Represent mediaList as a FormArray
    });
  }

  resetForm() {
    this.newQuestion.reset();
    this.editMode = false;
    this.editingQuestion = null;
  }
  addQuestion() {
    // Convert mediaList FormArray to an array of objects
    const mediaList = (this.newQuestion.get('mediaList') as FormArray).value as Media[];

    // Create a new Question object with the mediaList array
    const newQuestion: Question = {
      answersNumber: this.newQuestion.value.answersNumber,
      answersNumberCorrect: this.newQuestion.value.answersNumberCorrect,
      text: this.newQuestion.value.text,
      type: this.newQuestion.value.type,
      scorePoints: this.newQuestion.value.scorePoints,
      subject: {
        id: this.newQuestion.value.subject.id,
        intitule: this.newQuestion.value.subject.intitule
      },
      level: {
        id: this.newQuestion.value.level.id,
        description: this.newQuestion.value.level.description
      },
      mediaList: mediaList
    };

    this.questionService.addQuestion(newQuestion).subscribe(
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

  media = {
    link: '',
    type: ''
  };
  addMedia() {
    const mediaList = this.newQuestion.get('mediaList') as FormArray;
    mediaList.push(this.formBuilder.group({
      link: [''],  // or provide default values if needed
      type: ['']
    }));
  }
  

  removeMedia(index: number) {
    const mediaList = this.newQuestion.get('mediaList') as FormArray;
    mediaList.removeAt(index);
  }

  updateQuestion() {
    if (this.editingQuestion) {
      // Convert mediaList FormArray to an array of objects
      const mediaList = (this.newQuestion.get('mediaList') as FormArray).value as Media[];
  
      // Create an updated Question object with the mediaList array
      const updatedQuestion: Question = {
        questionId: this.editingQuestion?.questionId ?? 0,
        answersNumber: this.newQuestion.value.answersNumber,
        answersNumberCorrect: this.newQuestion.value.answersNumberCorrect,
        text: this.newQuestion.value.text,
        type: this.newQuestion.value.type,
        scorePoints: this.newQuestion.value.scorePoints,
        subject: {
          id: this.newQuestion.value.subject.id,
          intitule: this.newQuestion.value.subject.intitule
        },
        level: {
          id: this.newQuestion.value.level.id,
          description: this.newQuestion.value.level.description
        },
        mediaList: mediaList
      };
  
      this.questionService.updateQuestion(updatedQuestion.questionId ?? 0, updatedQuestion).subscribe(

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
  getMediaListControls() {
    return (this.newQuestion.get('mediaList') as FormArray).controls;
  }
}