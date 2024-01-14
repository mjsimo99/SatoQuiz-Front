import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/student/student';

export const loadStudents = createAction('[Student] Load Students');

export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Student] Load Students Failure',
  props<{ error: any }>()
);
