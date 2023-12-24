
import { TestQuestion } from '../TestQuestion/test-question';
import { Teacher } from '../teacher/teacher';

export interface Test {

    testId: number;
    successScore: string;
    viewAnswer: boolean;
    viewResult: boolean;
    maxAttempt: number;
    remark: string;
    instructions: string;
    teacher: Teacher;
    questionTest: TestQuestion[];


}
