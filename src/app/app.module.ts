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
import { AssignmentTestDetailsComponent } from './components/assignment-test-details/assignment-test-details.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/chat/chat.component';
import { SalonComponent } from './components/salon/salon/salon.component';
import { CardModule } from 'primeng/card';
import { SalonDetailsComponent } from './components/salon-details/salon-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { assignTestReducer } from './state/reducers/assign-test.reducer';
import { AssignTestEffects } from './state/effects/assign-test.effects';
import { studentReducer } from './state/reducers/student.reducer';
import { StudentEffects } from './state/effects/student.effects';
import { TestEffects } from './state/effects/test.effects';
import { testReducer } from './state/reducers/test.reducer';


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
    AssignmentTestDetailsComponent,
    ChatComponent,
    SalonComponent,
    SalonDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    CardModule,
    StoreModule.forRoot({ assignTest: assignTestReducer, student: studentReducer , test: testReducer }), 
    EffectsModule.forRoot([AssignTestEffects, StudentEffects, TestEffects]), 
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
