import { Component } from '@angular/core';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {
  question: string;
  options: string[];
  correctAnswer: number;
  selectedOption: number | null = null;

  constructor() {
    // Set the question, options, and correct answer
    this.question = "What is the capital of France?";
    this.options = ["London", "Paris", "Berlin", "Rome"];
    this.correctAnswer = 1; // Index of the correct answer (Paris)
  }

  selectOption(optionIndex: number): void {
    this.selectedOption = optionIndex;
  }

  nextQuestion(): void {
    if (this.selectedOption === this.correctAnswer) {
      console.log('Correct answer!');
      // Handle correct answer logic here
    } else {
      console.log('Incorrect answer!');
      // Handle incorrect answer logic here
    }

    // Reset selected option for the next question
    this.selectedOption = null;
  }
}