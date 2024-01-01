import { ChatMessage } from "../chatmessage/chat-message";
import { Salon } from "../salon/salon";
import { Student } from "../student/student";
import { ParticipateId } from "./participate-id";

export interface Participate {

    participateId : ParticipateId;
    date : Date;
    // student : Student;
    // salon : Salon;
    chatMessages : ChatMessage[];
}
