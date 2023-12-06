import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher/teacher.service';
import { Teacher } from '../../models/teacher/teacher';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  newTeacher!: FormGroup;
  showModal = false;
  editMode = false;
  editingTeacher: Teacher | null = null;

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchTeachers();
  }


  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingTeacher = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editTeacher(teacher: Teacher) {
    this.editMode = true;
    this.editingTeacher = teacher;

    this.newTeacher.setValue({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      dateOfBirth: teacher.dateOfBirth,
      address: teacher.address,
      specialty: teacher.specialty,

    });

    this.openModal();
  }

  fetchTeachers() {
    this.teacherService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createForm() {
    this.newTeacher = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      specialty: ['', Validators.required],
    });
  }

  resetForm() {
    this.newTeacher.reset();
    this.editMode = false;
    this.editingTeacher = null;
  }


  addTeacher() {

      this.teacherService.addTeacher(this.newTeacher.value).subscribe(
        (data) => {
          this.fetchTeachers();
          this.closeModal();
          this.resetForm();
          this.showSuccessAlert('Teacher added successfully!');
        },
        (error) => {
          console.error('Error adding teacher:', error);
          this.showErrorAlert('Error adding teacher!');
        }
      );
    
  }


  updateTeacher() {
    if (this.newTeacher.valid) {
      this.teacherService.updateTeacher(this.editingTeacher!.teacherId, this.newTeacher.value).subscribe(
        (data) => {
          this.fetchTeachers();
          this.closeModal();
          this.resetForm();
          this.showSuccessAlert('Teacher updated successfully!');
        },
        (error) => {
          console.error('Error updating teacher:', error);
          this.showErrorAlert('Error updating teacher!');
        }
      );
    } else {
      this.showAlert('Warning', 'Please fill out all the fields', 'warning');
    }
  }

  deleteTeacher(teacher: Teacher) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherService.deleteTeacher(teacher.teacherId).subscribe(
          (data) => {
            this.fetchTeachers();
            this.showSuccessAlert('Teacher deleted successfully!');
          },
          (error) => {
            console.error('Error deleting teacher:', error);
            this.showErrorAlert('Error deleting teacher!');
          }
        );
      }
    });
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
      confirmButtonText: 'Ok',
    });
  }
}