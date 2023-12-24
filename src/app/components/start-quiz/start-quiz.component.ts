import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test/test.service';
import { TestQuestionService } from 'src/app/services/testQuestion/test-question.service';
import { Test } from 'src/app/models/test/test';
import { TestQuestion } from 'src/app/models/TestQuestion/test-question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReponseService } from 'src/app/services/reponse/reponse.service';
import { Reponse } from 'src/app/models/reponse/reponse';
import { Answer } from 'src/app/models/answer/answer';
import { Question } from 'src/app/models/question/question';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  test: Test | null = null;
  testQuestions: TestQuestion[] = [];
  selectedAnswers: { [key: number]: { answer: Answer; question: Question } } = {};
  currentQuestionIndex: number = 0;
  countdown: number = 0;
  countdownInterval: any;

  constructor(
    private testService: TestService,
    private testQuestionService: TestQuestionService,
    private reponseService : ReponseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router  
    
  ) {

  }

  ngOnInit(): void {
    this.fetchTestAndQuestions();
  }
  getCurrentQuestion(): TestQuestion {
    return this.testQuestions[this.currentQuestionIndex];
  }
  nextQuestion() {
    const selectedAnswer = this.selectedAnswers[this.currentQuestionIndex];
    if (selectedAnswer !== undefined) {
      this.saveSelectedAnswer(selectedAnswer);
    }

    if (this.currentQuestionIndex < this.testQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.resetCountdown();
    } else {
      this.showAlert("Test terminé", "Votre test est terminé", "success");
      this.navigateToHome();
    }
  }
  private navigateToHome() {

    this.router.navigate(['/assign-tests']);
  }
  saveSelectedAnswer(selectedAnswer: any): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      const assignTestId = +this.route.snapshot.params['assignTestId'];
  
      const response: Reponse = {
        questionResult: selectedAnswer.points, 
        assignTest: {
          assignTestId: assignTestId,
        },
        validation: {
          answer: selectedAnswer.answer,
          question: currentQuestion.question,
        },
      };
  
      this.reponseService.addReponse(response).subscribe(
        (response) => {
          console.log('Response saved successfully:', response);
        },
        (error) => {
          console.error('Error saving response:', error);
        }
      );
    }
  }
  
  
  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.nextQuestion();  
      }
    }, 1000); 
  }

  resetCountdown(): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      this.countdown = currentQuestion.temporize;
    }
  }
  
  
  
  
  isAnswerSelected(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== undefined;
  }



  fetchTestAndQuestions() {
    this.route.paramMap.subscribe((params) => {
      const testIdString = params.get('testId');
      if (testIdString) {
        const testId = +testIdString;

        this.testService.getTestById(testId).subscribe(
          (testData) => {
            this.test = testData;
            console.log('Test:', this.test);

            this.testQuestionService.getTestQuestionsByTestId(testId).subscribe(
              (testQuestionsData) => {
                this.testQuestions = testQuestionsData;
                console.log('Test Questions:', this.testQuestions);
                this.resetCountdown();
                this.startCountdown();
              },
              (testQuestionsError) => {
                console.error('Error fetching test questions:', testQuestionsError);
              }
            );
          },
          (error) => {
            console.error('Error fetching test:', error);
          }
        );
      } else {
        console.error('Test ID is null or undefined');
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
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

