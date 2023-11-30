export interface Subject {
    id?: number;
    intitule: string;
    parent?: Subject;
    children?: Subject[];
  }
