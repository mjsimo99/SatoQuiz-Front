// app/components/level/level.component.ts
import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level/level.service';
import { Level } from '../../models/level.model';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'], // Optional: Add if you have a CSS file
})
export class LevelComponent implements OnInit {
  levels: Level[] = []; // Initialize with an empty array

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
}
