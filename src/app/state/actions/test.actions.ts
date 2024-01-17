import { createAction, props } from '@ngrx/store';
import { Test } from 'src/app/models/test/test';

export const loadTests = createAction('[Test] Load Tests');

export const loadTestsSuccess = createAction(
  '[Test] Load Tests Success',
  props<{ tests: Test[] }>()
);

export const loadTestsFailure = createAction(
  '[Test] Load Tests Failure',
  props<{ error: any }>()
);