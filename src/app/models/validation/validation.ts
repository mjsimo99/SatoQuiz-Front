import { Answer } from "../answer/answer";
import { Question } from "../question/question";

export interface Validation {
    answer: Answer;
    question: Question;
    points: number;

}
