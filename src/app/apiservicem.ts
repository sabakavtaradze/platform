import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";
export type ModelChatroomFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelChatroomFilterInput | null> | null;
  or?: Array<ModelChatroomFilterInput | null> | null;
  not?: ModelChatroomFilterInput | null;
  chatroomLastMessageId?: ModelIDInput | null;
};
export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};
export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}
export type ListChatroomsQuery = {
  __typename: "ModelChatroomConnection";
  items: Array<{
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  } | null>;
  nextToken?: string | null;
};
export type GetUserQuery = {
  __typename: "User";
  id: string;
  name?: string | null;
  userid?: string | null;
  status?: string | null;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  Chatrooms?: {
    items: {
      some:any;
      filter: any;
      __typename: "ModelUserChatroomConnection";
      nextToken?: string | null | undefined;
    } | null | undefined;
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  createdAt: string;
  updatedAt: string;

};
export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null;
  text?: ModelStringInput | null;
  chatroomID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelMessageFilterInput | null> | null;
  or?: Array<ModelMessageFilterInput | null> | null;
  not?: ModelMessageFilterInput | null;
};

export type MessagesByChatroomIDQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};



export type GetChatroomQuery = {
  filter(arg0: (chat: { chatroom: { users: { items: any[]; }; }; }) => boolean): unknown;
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
    items?: {
      sort(arg0: (a: any, b: any) => 1 | -1): unknown;
      forEach(arg0: (v: any) => void): unknown;

      chatroomID: string
      text: string
      images?: Array<string | null> | null;
      id: string
      createdAt: string
      updatedAt: string
      userID: string
    } | null

  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
    items?:{
    filter: any;

      user?:{
        id:string;
        name:string;
        profilepicture:string;
      }
    }
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    images?: Array<string | null> | null;
    chatroomID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;

};
export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
  from = "from"
}
export class APIServicem {
  async ListChatrooms(
    filter?: ModelChatroomFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListChatroomsQuery> {
    const statement = `query ListChatrooms($filter: ModelChatroomFilterInput, $limit: Int, $nextToken: String) {
        listChatrooms(nextToken: $nextToken, filter: $filter, limit: $limit) {
            items {
              users {
                nextToken
                items {
                  chatroom {
                    id
                  }
                  id
                  user {
                    id
                    name
                    profilepicture
                  }
                }
              }
              id
              createdAt
              updatedAt
              chatroomLastMessageId
            }
          }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListChatroomsQuery>response.data.listChatrooms;
  }



  async getchatroom(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            Chatrooms {
              items {
                chatroom {
                  id
                  users {
                    items {
                      user {
                        name
                        id
                        profilepicture
                      }
                    }
                  }
                  LastMessage {
                    updatedAt
                    id
                    text
                    images
                    userID
                  }
                }
              }
            }
          }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }

  


  async GetChatroomUser(id: string): Promise<GetChatroomQuery> {
    const statement = `query GetChatroom($id: ID!) {
        getChatroom(id: $id) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            items {
              user {
                name
                id
                profilepicture
              }
            }
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            userID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          chatroomLastMessageId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetChatroomQuery>response.data.getChatroom;
  }


  

  async MessagesByChatroomID(
    chatroomID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelMessageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<MessagesByChatroomIDQuery> {
    const statement = `query MessagesByChatroomID($chatroomID: ID!, $sortDirection: ModelSortDirection, $filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
        messagesByChatroomID(
          chatroomID: $chatroomID
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            text
            chatroomID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      chatroomID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MessagesByChatroomIDQuery>response.data.messagesByChatroomID;
  }


  async GetChatroomMessages(id: string, limitVariable:number, sort:string): Promise<GetChatroomQuery> {
    const statement = `query GetChatroom($id: ID!, $limitVariable: Int!, $sort: ModelSortDirection!) {
      getChatroom(id: $id) {
        LastMessage {
          text
        }
        chatroomLastMessageId
        Messages(limit: $limitVariable, sortDirection: $sort) {
          items {
            chatroomID
            text
            id
            createdAt
            updatedAt
            images
            userID
          }
        }
      }
    }`
    
    const gqlAPIServiceArguments: any = { id, limitVariable, sort };
    
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    
    const chatroomData: GetChatroomQuery = response.data.getChatroom;
    
    // Sort messages by createdAt in descending order
    if (chatroomData && chatroomData.Messages && chatroomData.Messages.items) {
      chatroomData.Messages.items.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : 1
      );
    }
    
    return chatroomData;
    
  }
 


  
  async GetChatroomMessagesall(id: string, sort:string): Promise<GetChatroomQuery> {
    const statement = `query GetChatroom($id: ID!, $sort: ModelSortDirection!) {
      getChatroom(id: $id) {
        LastMessage {
          text
        }
        chatroomLastMessageId
        Messages(sortDirection: $sort) {
          items {
            chatroomID
            text
            id
            createdAt
            updatedAt
            userID
          }
        }
      }
    }`
    
    const gqlAPIServiceArguments: any = { id, sort };
    
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    
    const chatroomData: GetChatroomQuery = response.data.getChatroom;
    
    // Sort messages by createdAt in descending order
    if (chatroomData && chatroomData.Messages && chatroomData.Messages.items) {
      chatroomData.Messages.items.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : 1
      );
    }
    
    return chatroomData;
    
  }
 
  

  // async getChatroomByUser(id: string, id1: string): Promise<GetUserQuery> {
  //   const statement = `query GetUser($id: ID!, $id1: ID!) {
  //     getUser(id: $id) {
  //       id
  //       Chatrooms {
  //         items {
  //           chatroom  {
  //             id
  //             users(filter: { id:  { eq: $id1 } }) {
  //               items {
  //                 user {
  //                   name
  //                   id
  //                   profilepicture
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }`;
  
  //   const gqlAPIServiceArguments: any = {
  //     id,
  //     id1
  //   };
  
  //   const response = await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments)) as any;
    
  //   return response.data.getUser as GetUserQuery;
  // }





// async getChatroomByUser(id: string, id1:string): Promise<GetUserQuery> {
//   const statement = `query GetUser($id: ID!, $id1: ModelIDInput = {}) {
//     getUser(id: $id) {
//       id
//       Chatrooms {
//         items {
//           chatroom {
//             id
//             users(filter: {id: $id1}) {
//               items {
//                 user {
//                   name
//                   id
//                   profilepicture
//                 }
//               }
//             }
//             LastMessage {
//               updatedAt
//               id
//               text
//             }
//           }
//         }
//       }
//     }
//   }`;
//   const gqlAPIServiceArguments: any = {
//     id,
//     id1
//   };
//   const response = (await API.graphql(
//     graphqlOperation(statement, gqlAPIServiceArguments)
//   )) as any;
//   return <GetUserQuery>response.data.getUser;
// }

  




}









