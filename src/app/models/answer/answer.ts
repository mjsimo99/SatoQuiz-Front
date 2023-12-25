export interface Answer {
    answerId?: number;
    answerText: string;
    validationIds: number[];
    selected?: boolean; // add this line

  }
  