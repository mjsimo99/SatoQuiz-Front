import { Question } from "../question/question";
import { Test } from "../test/test";

export interface TestQuestion {
    test: Test;
    question: Question;
    temporize: number;
}
