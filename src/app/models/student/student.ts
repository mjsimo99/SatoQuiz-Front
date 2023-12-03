import { User } from "../user/user";

export interface Student extends User {
  studentId: number;
  registrationDate: string; 
}

