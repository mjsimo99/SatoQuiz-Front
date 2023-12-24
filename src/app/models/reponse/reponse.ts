export interface Reponse {
    reponseId?: number;
    questionResult: number;
    assignTest: {
      assignTestId: number;
    };
    validation: {
      answer: {
        answerId: number;
      };
      question: {
        questionId?: number;
      };
    };
  }
  