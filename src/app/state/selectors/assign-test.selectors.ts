import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssignTestState } from '../reducers/assign-test.reducer';

export const selectAssignTestState = createFeatureSelector<AssignTestState>('assignTest');

export const selectAssignTests = createSelector(
  selectAssignTestState,
  (state) => state.assignTests
);
