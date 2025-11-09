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
    chatRoomID: number;           // backend may use this exact casing
    chatRoomId: number;           // camelCase alias
    lastMessageContent: string;
    lastMessageSenderId: number;
    lastMessageSentAt: string;    // ISO datetime
    otherUserId: number;
    otherUsername: string;
    unreadCount?: number;
}