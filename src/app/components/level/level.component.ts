

// app/components/level/level.component.ts
import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level/level.service';
import { Level } from '../../models/level.model';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  levels: Level[] = [];
  showModal = false; 
  newLevel: Level = { description: 'Hard', maxPoints: 0, minPoints: 0 }; 

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

  addNewLevel() {
    this.levelService.addLevel(this.newLevel).subscribe(
      (data) => {
        this.newLevel = { description: '', maxPoints: 0, minPoints: 0 };
        this.fetchLevels();
        this.showModal = false; 
      },
      (error) => {
        console.error('Error adding new level:', error);
      }
    );
  }





}
