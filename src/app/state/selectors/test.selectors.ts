import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestState } from '../reducers/test.reducer';

export const selectTestState = createFeatureSelector<TestState>('test');

export const selectTests = createSelector(
  selectTestState,
  (state) => state.tests
);