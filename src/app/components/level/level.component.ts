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
      },
      (error) => {
        console.error('Error adding new level:', error);
      }
    );
  }

  updateLevel(level: Level) {
    // Implement the logic to update the level
    console.log('Update level:', level);
  }

  deleteLevel(level: Level) {
    // Implement the logic to delete the level
    console.log('Delete level:', level);
    const levelId = level.id;

    if (levelId) {
      this.levelService.deleteLevel(levelId).subscribe(
        () => {
          this.fetchLevels();
        },
        (error) => {
          console.error('Error deleting level:', error);
        }
      );
    }
  }
}
