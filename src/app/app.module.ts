import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './components/level/level.component';
import { QuizDashboardComponent } from './components/quiz-dashboard/quiz-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { SubjectComponent } from './components/subject/subject.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';


@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    QuizDashboardComponent,
    SubjectComponent,
    QuestionComponent,
    AnswerComponent,
    
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
