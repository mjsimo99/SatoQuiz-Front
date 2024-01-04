import { createAction, props } from '@ngrx/store';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';

export const loadAssignTests = createAction('[AssignTest] Load AssignTests');

export const loadAssignTestsSuccess = createAction(
  '[AssignTest] Load AssignTests Success',
  props<{ assignTests: AssignTest[] }>()
);

export const loadAssignTestsFailure = createAction(
  '[AssignTest] Load AssignTests Failure',
  props<{ error: any }>()
);

export const addAssignTest = createAction(
  '[AssignTest] Add AssignTest',
  props<{ assignTest: AssignTest }>()
);

export const updateAssignTest = createAction(
  '[AssignTest] Update AssignTest',
  props<{ assignTest: AssignTest }>()
);

export const deleteAssignTest = createAction(
  '[AssignTest] Delete AssignTest',
  props<{ assignTestId: number }>()
);
