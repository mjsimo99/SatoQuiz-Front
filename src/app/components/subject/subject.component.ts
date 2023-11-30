import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { Subject } from '../../models/subject/subject.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  newSubject!: FormGroup;
  showModal = false;
  editMode = false;
  editingSubject: Subject | null = null;

  constructor(private subjectService: SubjectService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchSubjects();
  }

  closeModal() {
    console.log('Closing modal...');
    this.showModal = false;
    this.editMode = false;
    this.editingSubject = null;
  }

  openModal() {
    console.log('Opening modal...');
    this.showModal = true;
  }

  editSubject(subject: Subject) {
    this.editMode = true;
    this.editingSubject = subject;

    this.newSubject.setValue({
      intitule: subject.intitule,
      parent: {
        id: subject.parent?.id || null,
      },
      children: subject.children,
    });
    
    this.openModal();
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

  createForm() {
    this.newSubject = this.formBuilder.group({
      intitule: ['', Validators.required],
      parent: this.formBuilder.group({
        id: [''],
      }),
      children: [''],
    });
  }

  deleteSubject(subject: Subject) {
    const subjectId = subject.id;
    if (subjectId !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this subject',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subjectService.deleteSubject(subjectId).subscribe(
            () => {
              // Fetch subjects again after deleting the subject
              this.fetchSubjects();
              this.showSuccessAlert('Subject deleted');
            },
            (error) => {
              console.error('Error deleting subject:', error);
              const errorMessage = error.error?.message || 'Error deleting subject';
              this.showErrorAlert(errorMessage);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showAlert('Cancelled', 'Subject not deleted', 'error');
        }
      });
    }
  }
  

  updateSubject() {
    const subjectId = this.editingSubject?.id;
    if (subjectId !== undefined) {
      const subjectData = this.newSubject.value;
      this.subjectService.updateSubject(subjectId, subjectData).subscribe(
        () => {
          this.fetchSubjects();
          this.resetForm();
          this.closeModal();
          this.showSuccessAlert('Subject updated');
        },
        (error) => {
          console.error('Error updating subject:', error);
          const errorMessage = error.error?.message || 'Error updating subject';
          this.showErrorAlert(errorMessage);
        }
      );
    }
  }

  addSubject() {
    const newSubjectData = this.newSubject.value;

    if (newSubjectData.parent.id === null) {
      delete newSubjectData.parent;
    }

    this.subjectService.addSubject(newSubjectData).subscribe(
      () => {
        this.fetchSubjects();
        this.resetForm();
        this.closeModal();
        this.showSuccessAlert('New subject added');
      },
      (error) => {
        console.error('Error adding subject:', error);
        this.showErrorAlert('Error adding subject');
      }
    );
  }

  resetForm() {
    this.newSubject.reset();
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
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
