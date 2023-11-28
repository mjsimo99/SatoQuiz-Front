import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './components/level/level.component';
import { QuizDashboardComponent } from './components/quiz-dashboard/quiz-dashboard.component';
import { QuizInterfaceComponent } from './components/quiz-interface/quiz-interface.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    QuizDashboardComponent,
    QuizInterfaceComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
