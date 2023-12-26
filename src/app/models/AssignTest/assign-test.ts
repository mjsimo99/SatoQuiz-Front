import { Student } from "../student/student";
import { Test } from "../test/test";
import { Reponse } from "../reponse/reponse";

export interface AssignTest {
    assignTestId?: number;
    startDate: string;
    endDate: string; 
    raison?: string;
    attemptNumber: number;
    finalResult: number;
    student: Student;
    test: Test;
    reponses: Reponse[]; 
}
