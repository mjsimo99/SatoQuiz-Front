import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../models/student/student';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  newStudent!: FormGroup;
  showModal = false;
  editMode = false;
  editingStudent: Student | null = null;

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchStudents();
  }


  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingStudent = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editStudent(student: Student) {
    this.editMode = true;
    this.editingStudent = student;

    this.newStudent.setValue({
      registrationDate: student.registrationDate,
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      address: student.address,

      });

    this.openModal();
  }

  fetchStudents(){
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  createForm() {
    this.newStudent = this.formBuilder.group({
      registrationDate: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  resetForm() {
    this.newStudent.reset();
    this.editMode = false;
    this.editingStudent = null;
  }


  addStudent() {
    this.studentService.addStudent(this.newStudent.value).subscribe(
      (data) => {
        this.students.push(data);
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('Student added successfully!');
      },
      (error) => {
        console.error('Error adding student:', error);
        this.showErrorAlert('Error adding student!');
      }
    );
  }

  updateStudent() {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent.studentId, this.newStudent.value).subscribe(
        (data) => {
          const index = this.students.findIndex((student) => student.studentId === data.studentId);
          this.students[index] = data;
          this.resetForm();
          this.closeModal();
          this.showSuccessAlert('Student updated successfully!');
        },
        (error) => {
          console.error('Error updating student:', error);
          this.showErrorAlert('Error updating student!');
        }
      );
    }
  }

  deleteStudent(student: Student){
    console.log('Delete student:', student);
    const studentId = student.studentId;

    if (studentId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this student!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(studentId).subscribe(
          () => {
            this.fetchStudents();
            this.resetForm();
            this.closeModal();
            this.showSuccessAlert('stucent deleted successfully!');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.showAlert('Cancelled', 'Student not deleted', 'error');
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
      confirmButtonText: 'Ok',
    });
  }
}

