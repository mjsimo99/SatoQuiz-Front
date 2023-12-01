import { Media } from "../media/media";

export interface Question {
    questionId?: number; 
    answersNumber: number;
    answersNumberCorrect: number; 
    text: string;
    duration: string; 
    type: string; 
    scorePoints: number; 
    subject: { id: number };
    level: { id: number };
    mediaList?: Media[]; 
  }