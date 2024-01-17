import { Action, createReducer, on } from '@ngrx/store';
import * as StudentActions from '../actions/student.actions';
import { Student } from 'src/app/models/student/student';

export interface StudentState {
  students: Student[];
}

export const initialState: StudentState = {
  students: [],
};

export const studentReducer = createReducer(
    initialState,

    on(StudentActions.loadStudentsSuccess, (state, { students }) => {
        return { ...state, students };
    }
    ),
);


export function reducer(state: StudentState | undefined, action: Action) {
    return studentReducer(state, action);
    }