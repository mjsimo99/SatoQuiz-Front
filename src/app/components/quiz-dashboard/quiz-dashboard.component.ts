// quiz-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level/level.service';
import { Level } from '../../models/level.model';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css'],
})
export class QuizDashboardComponent implements OnInit {
  levels: Level[] = [];
  imageUrl = 'assets/images/satoquiz.png';
  majidi = 'assets/images/majidi.jpg';



  constructor(private levelService: LevelService) {}

  ngOnInit(): void {
    this.fetchLevels();
  }

  fetchLevels() {
    this.levelService.getAllLevels().subscribe(
      (data) => {
        this.levels = data;
      },
      (error) => {
        console.error('Error fetching levels:', error);
      }
    );
  }

  // Add, update, and delete methods go here
}
