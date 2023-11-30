import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level/level.service';
import { Level } from '../../models/level.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  levels: Level[] = [];
  newLevel!: FormGroup;
  showModal = false;
  editMode = false;
  editingLevel: Level | null = null;

  constructor(private levelService: LevelService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchLevels();
  }

  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingLevel = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editLevel(level: Level) {
    this.editMode = true;
    this.editingLevel = level;

    this.newLevel.setValue({
      description: level.description,
      minPoints: level.minPoints,
      maxPoints: level.maxPoints,
    });

    this.openModal();
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

  createForm() {
    this.newLevel = this.formBuilder.group({
      description: ['', Validators.required],
      minPoints: ['', [Validators.required, Validators.min(0)]],
      maxPoints: ['', [Validators.required, Validators.min(1)]],
    });
  }

  resetForm() {
    this.newLevel.reset();
    this.editMode = false;
    this.editingLevel = null;
  }

  addNewLevel() {
    const levelData = this.newLevel.value;

    this.levelService.addLevel(levelData).subscribe(
      () => {
        this.fetchLevels();
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('New level added');
      },
      (error) => {
        console.error('Error adding new level:', error);
        const errorMessage = error.error?.message || 'Error adding new level';
        this.showErrorAlert(errorMessage);
      }
    );
  }

  updateLevel() {
    const levelData = this.newLevel.value;

    if (this.editingLevel) {
      this.levelService.updateLevel(this.editingLevel?.id || 0, levelData).subscribe(
        () => {
          this.fetchLevels();
          this.resetForm();
          this.closeModal();
          this.showSuccessAlert('Level updated successfully');
        },
        (error) => {
          console.error('Error updating level:', error);
          const errorMessage = error.error?.message || 'Error updating level';
          this.showErrorAlert(errorMessage);
        }
      );
    }
  }

  deleteLevel(level: Level) {
    console.log('Delete level:', level);
    const levelId = level.id;

    if (levelId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this level!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.levelService.deleteLevel(levelId).subscribe(
            () => {
              this.fetchLevels();
              this.showSuccessAlert('Level deleted');
            },
            (error) => {
              console.error('Error deleting level:', error);
              this.showErrorAlert('Error deleting level');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showAlert('Cancelled', 'Level not deleted', 'error');
        }
      });
    }
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

  private showAlert(title: string, text: string, icon: any): void {
    Swal.fire({
      title,
      text,
      icon,
    });
  }
}
