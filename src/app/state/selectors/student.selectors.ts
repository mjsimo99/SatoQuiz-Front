import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from '../reducers/student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('student');

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
);

