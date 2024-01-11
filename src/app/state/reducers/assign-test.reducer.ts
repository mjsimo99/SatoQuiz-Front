import { createReducer, on } from '@ngrx/store';
import * as AssignTestActions from '../actions/assign-test.actions';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';

export interface AssignTestState {
  assignTests: AssignTest[];
}

export const initialState: AssignTestState = {
  assignTests: [],
};

export const assignTestReducer = createReducer(
  initialState,

  on(AssignTestActions.loadAssignTestsSuccess, (state, { assignTests }) => {
    return { ...state, assignTests };
  }),

  on(AssignTestActions.addAssignTest, (state, { assignTest }) => {
    return { ...state, assignTests: [...state.assignTests, assignTest] };
  }),

  on(AssignTestActions.updateAssignTest, (state, { assignTest }) => {
    const updatedAssignTests = state.assignTests.map((t) =>
      t.assignTestId === assignTest.assignTestId ? assignTest : t
    );
    return { ...state, assignTests: updatedAssignTests };
  }),

  on(AssignTestActions.deleteAssignTest, (state, { assignTestId }) => {
    const updatedAssignTests = state.assignTests.filter((t) => t.assignTestId !== assignTestId);
    return { ...state, assignTests: updatedAssignTests };
  })
);
