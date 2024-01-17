import { AssignTestState } from "../reducers/assign-test.reducer";
import { StudentState } from "../reducers/student.reducer";
import { TestState } from "../reducers/test.reducer";

export interface AppState {
  assignTests: AssignTestState;
  students: StudentState;
  tests: TestState;
  
}
