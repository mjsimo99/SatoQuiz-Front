// app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelComponent } from './components/level/level.component';
import { QuizDashboardComponent } from './components/quiz-dashboard/quiz-dashboard.component';

const routes: Routes = [
  { path: 'levels', component: LevelComponent },
  { path: '', redirectTo: '/QuizDashboardComponent', pathMatch: 'full' }, // redirect to `first-component`
   //{ path: '**', component: LevelComponent }, // Wildcard route for a 404 page
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
