import { Level } from "../level.model";
import { Subject } from "../subject/subject.model";
import { Teacher } from "../teacher/teacher";

export interface Question {
  questionId?: number;
  answersNumber: number;
  answersNumberCorrect: number;
  text: string;
  type: string;
  scorePoints: number;
  subject: Subject;
  level: Level;
  mediaList: {
    mediaId?: number;
    link: string;
    type: string;
  }[];
}
