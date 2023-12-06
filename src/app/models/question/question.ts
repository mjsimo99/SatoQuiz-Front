export interface Question {
  questionId?: number;
  answersNumber: number;
  answersNumberCorrect: number;
  text: string;
  type: string;
  scorePoints: number;
  subject: {
    id: number;
    intitule: string;
  };
  level: {
    id: number;
    description: string;
  };
  mediaList: {
    mediaId?: number;
    link: string;
    type: string;
  }[];
}
