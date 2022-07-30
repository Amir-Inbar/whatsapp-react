export interface Msg {
    body:string;
    createdAt:number;
    displayname:string | null;
    id:string;
    senderId:string;
    status:string;
    type:string
}