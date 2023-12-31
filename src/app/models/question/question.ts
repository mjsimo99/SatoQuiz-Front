import { TestQuestion } from "../TestQuestion/test-question";
import { Answer } from "../answer/answer";
import { Level } from "../level.model";
import { Subject } from "../subject/subject.model";
import { Teacher } from "../teacher/teacher";
import { Validation } from "../validation/validation";
import { TypeAnswer } from "./TypeAnswer";

export interface Question {
  questionId?: number;
  answersNumber: number;
  answersNumberCorrect: number;
  text: string;
  type: TypeAnswer;
  scorePoints: number;
  subject: Subject;
  level: Level;
  mediaList: {
    mediaId?: number;
    link: string;
    type: string;
  }[];
  questionTest: TestQuestion[];
  validations : Validation[];

}
