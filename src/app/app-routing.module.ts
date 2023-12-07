import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelComponent } from './components/level/level.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { PartieStudentComponent } from './components/partie-student/partie-student.component';
import { ValidationComponent } from './components/validation/validation.component';
import { TestComponent } from './components/test/test.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';


const routes: Routes = [
  { path: 'levels', component: LevelComponent },
  { path: '', redirectTo: 'QuizDashboardComponent', pathMatch: 'full' },
  { path: 'subjects', component: SubjectComponent }, 
  { path: 'answers', component: AnswerComponent }, 
  { path: 'questions' , component: QuestionComponent},
  { path: 'students' , component: StudentComponent},
  { path: 'teachers' , component: TeacherComponent},
  { path: 'partie-student' , component: PartieStudentComponent},
  { path: 'validations' , component: ValidationComponent},
  { path: 'tests', component: TestComponent },
  { path: 'start-quiz', component: StartQuizComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
