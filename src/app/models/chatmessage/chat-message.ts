import { Participate } from "../participate/participate";

export interface ChatMessage {
    id? : number;
    content : string;
    participate : Participate ;
    timestamp : Date;
}
