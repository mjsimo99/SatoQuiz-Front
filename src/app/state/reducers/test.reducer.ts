import { Action, createReducer, on } from '@ngrx/store';
import * as TestActions from '../actions/test.actions';
import { Test } from 'src/app/models/test/test';

export interface TestState {
  tests: Test[];
}

export const initialState: TestState = {
  tests: [],
};

export const testReducer = createReducer(
  initialState,

  on(TestActions.loadTestsSuccess, (state, { tests }) => {
    return { ...state, tests };
  }),

 
  
  
);