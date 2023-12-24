import { Student } from "../student/student";
import { Test } from "../test/test";

export interface AssignTest {
    assignTestId?: number;
    startDate: string;
    endDate: string; 
    raison?: string;
    attemptNumber: number;
    finalResult: number;
    student: Student;
    test: Test;
}
