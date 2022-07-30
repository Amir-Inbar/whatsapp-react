import {Msg} from "../Msg/Msg"

export interface Chat {
    createdAt:{
        nanoseconds:number;
        seconds:number;
    };
    msgs:Msg[] | null;
    participants:string[];
    _id:string;
}