import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelComponent } from './components/level/level.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  { path: 'levels', component: LevelComponent },
  { path: '', redirectTo: 'QuizDashboardComponent', pathMatch: 'full' },
  { path: 'subjects', component: SubjectComponent }, 
  { path: 'answers', component: AnswerComponent }, 
  { path: 'questions' , component: QuestionComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
