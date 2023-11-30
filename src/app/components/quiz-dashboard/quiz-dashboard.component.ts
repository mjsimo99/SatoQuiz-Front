// quiz-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level/level.service';
import { Level } from '../../models/level.model';
import { SubjectService } from '../../services/subject/subject.service';
import { Subject } from '../../models/subject/subject.model';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css'],
})
export class QuizDashboardComponent implements OnInit {
  levels: Level[] = [];
  subjects: Subject[] = [];
  imageUrl = 'assets/images/satoquiz.png';
  majidi = 'assets/images/majidi.jpg';
  level = 'assets/images/level.png';
  subject = 'assets/images/subject.png';
  question = 'assets/images/question.png';
  answer = 'assets/images/answer.png';

  constructor(private levelService: LevelService, private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.fetchLevels();

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

  
}
