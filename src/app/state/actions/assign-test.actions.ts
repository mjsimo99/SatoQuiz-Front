import { createAction, props } from '@ngrx/store';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';

export const loadAssignTests = createAction('[Assign Test] Load Assign Tests');

export const loadAssignTestsSuccess = createAction(
  '[Assign Test] Load Assign Tests Success',
  props<{ assignTests: AssignTest[] }>()
);

export const loadAssignTestsFailure = createAction(
  '[Assign Test] Load Assign Tests Failure',
  props<{ error: any }>()
);

export const addAssignTest = createAction(
  '[AssignTest] Add AssignTest',
  props<{ assignTest: AssignTest }>()
);

export const updateAssignTest = createAction(
  '[AssignTest] Update Assign Test',
  props<{ assignTest: AssignTest }>()
);

export const deleteAssignTest = createAction(
  '[AssignTest] Delete AssignTest',
  props<{ assignTestId: number }>()
);
