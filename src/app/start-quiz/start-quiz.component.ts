import { Component } from '@angular/core';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {
  question = {
    text: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', isCorrect: false },
      { text: 'London', isCorrect: false },
      { text: 'Paris', isCorrect: true },
      { text: 'Madrid', isCorrect: false }
    ]
  };

  selectedAnswer: any;

  ngOnInit() {
    // Shuffle the answers (optional)
    this.shuffleAnswers();
  }

  selectAnswer(answer: any) {
    this.selectedAnswer = answer;
  }

  checkAnswer() {
    if (this.selectedAnswer && this.selectedAnswer.isCorrect) {
      alert('Correct Answer!');
    } else {
      alert('Wrong Answer. Try again!');
    }

    // Reset selected answer
    this.selectedAnswer = null;

    // Shuffle the answers for the next question (optional)
    this.shuffleAnswers();
  }

  // Helper function to shuffle answers (optional)
  shuffleAnswers() {
    this.question.answers = this.shuffleArray(this.question.answers);
  }

  // Helper function to shuffle array elements
  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}