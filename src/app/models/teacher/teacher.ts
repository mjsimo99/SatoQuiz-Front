import { User } from "../user/user";

export interface Teacher extends User {
    teacherId: number
    specialty: string;
}
