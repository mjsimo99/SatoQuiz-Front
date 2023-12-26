export interface Reponse {
    reponseId?: number;
    questionResult?: number;
    assignTest: {
      assignTestId: number;
    };
    validation: {
      answer: {
        answerId?: number; 
        answerText?: string;
      };
      question: {
        questionId?: number;
        text?: string;

      };
      points: number;
    };
  }
  