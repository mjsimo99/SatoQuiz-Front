import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './components/level/level.component';
import { QuizDashboardComponent } from './components/quiz-dashboard/quiz-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectComponent } from './components/subject/subject.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { PartieStudentComponent } from './components/partie-student/partie-student.component';
import { ValidationComponent } from './components/validation/validation.component';
import { TestComponent } from './components/test/test.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { TestQuestionComponent } from './components/testQuestion/test-question/test-question.component';
import { AssignTestsComponent } from './components/assign-tests/assign-tests.component';


@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    QuizDashboardComponent,
    SubjectComponent,
    QuestionComponent,
    AnswerComponent,
    StudentComponent,
    TeacherComponent,
    PartieStudentComponent,
    ValidationComponent,
    TestComponent,
    StartQuizComponent,
    TestQuestionComponent,
    AssignTestsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
