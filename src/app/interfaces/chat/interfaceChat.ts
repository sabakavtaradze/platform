// export interface chatList{
//     name: string;
//     date: string;
//     text: string;
//     profilePicture: string;
// }
export interface chatList {
    chatroomLastMessageId: string;
    createdAt:string;
    id: string;
    updatedAt: string;
}
export interface chatUsersList {
    createdAt?:string;
    id?:string;
    name?:string;
    status?:string;
    updatedAt?:string;
    userid?:string;
    profilepicture?:string;
}