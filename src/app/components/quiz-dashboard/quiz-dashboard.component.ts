// quiz-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level/level.service';
import { Level } from '../../models/level.model';
import { SubjectService } from '../../services/subject/subject.service';
import { Subject } from '../../models/subject/subject.model';
import { AnswerService } from '../../services/answer/answer.service';
import { Answer } from '../../models/answer/answer';
import { QuestionService } from 'src/app/services/question/question.service';
import { Question } from 'src/app/models/question/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css'],
})
export class QuizDashboardComponent implements OnInit {
  levels: Level[] = [];
  subjects: Subject[] = [];
  answers: Answer[] = [];
  questions: Question[] = [];
  imageUrl = 'assets/images/satoquiz.png';
  majidi = 'assets/images/majidi.jpg';
  level = 'assets/images/level.png';
  subject = 'assets/images/subject.png';
  question = 'assets/images/question.png';
  answer = 'assets/images/answer.png';
  currentRoute: string = '';



  constructor(private levelService: LevelService,
      private subjectService: SubjectService,
      private answerService: AnswerService,
      private questionService: QuestionService,
      private router: Router

  ) { }

  ngOnInit(): void {
    this.fetchLevels();
    this.fetchSubjects();
    this.fetchAnswers();
    this.fetchQuestions();
  }

  fetchLevels() {
    this.levelService.getAllLevels().subscribe(
      (data) => {
        this.levels = data;
        this.fetchSubjects();
      },
      (error) => {
        console.error('Error fetching levels:', error);
      }
    );
  }

  fetchSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects:', error);
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
  fetchQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    )
  }
  isStartQuizRoute(): boolean {
    return this.router.url === '/start-quiz';
  }


}