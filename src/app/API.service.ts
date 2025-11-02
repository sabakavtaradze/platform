/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateLikepost: OnCreateLikepostSubscription;
  onUpdateLikepost: OnUpdateLikepostSubscription;
  onDeleteLikepost: OnDeleteLikepostSubscription;
  onCreateImageuser: OnCreateImageuserSubscription;
  onUpdateImageuser: OnUpdateImageuserSubscription;
  onDeleteImageuser: OnDeleteImageuserSubscription;
  onCreateFollowers: OnCreateFollowersSubscription;
  onUpdateFollowers: OnUpdateFollowersSubscription;
  onDeleteFollowers: OnDeleteFollowersSubscription;
  onCreateFollowing: OnCreateFollowingSubscription;
  onUpdateFollowing: OnUpdateFollowingSubscription;
  onDeleteFollowing: OnDeleteFollowingSubscription;
  onCreateFriends: OnCreateFriendsSubscription;
  onUpdateFriends: OnUpdateFriendsSubscription;
  onDeleteFriends: OnDeleteFriendsSubscription;
  onCreateChatroom: OnCreateChatroomSubscription;
  onUpdateChatroom: OnUpdateChatroomSubscription;
  onDeleteChatroom: OnDeleteChatroomSubscription;
  onCreateMessage: OnCreateMessageSubscription;
  onUpdateMessage: OnUpdateMessageSubscription;
  onDeleteMessage: OnDeleteMessageSubscription;
  onCreateUser: OnCreateUserSubscription;
  onUpdateUser: OnUpdateUserSubscription;
  onDeleteUser: OnDeleteUserSubscription;
  onCreateComment: OnCreateCommentSubscription;
  onUpdateComment: OnUpdateCommentSubscription;
  onDeleteComment: OnDeleteCommentSubscription;
  onCreatePost: OnCreatePostSubscription;
  onUpdatePost: OnUpdatePostSubscription;
  onDeletePost: OnDeletePostSubscription;
  onCreateUserChatroom: OnCreateUserChatroomSubscription;
  onUpdateUserChatroom: OnUpdateUserChatroomSubscription;
  onDeleteUserChatroom: OnDeleteUserChatroomSubscription;
  onCreateUserPost: OnCreateUserPostSubscription;
  onUpdateUserPost: OnUpdateUserPostSubscription;
  onDeleteUserPost: OnDeleteUserPostSubscription;
};

export type CreateLikepostInput = {
  id?: string | null;
  postID: string;
  userID: string;
};

export type ModelLikepostConditionInput = {
  postID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelLikepostConditionInput | null> | null;
  or?: Array<ModelLikepostConditionInput | null> | null;
  not?: ModelLikepostConditionInput | null;
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

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Likepost = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateLikepostInput = {
  id: string;
  postID?: string | null;
  userID?: string | null;
};

export type DeleteLikepostInput = {
  id: string;
};

export type CreateImageuserInput = {
  id?: string | null;
  userID: string;
  image: string;
  text?: string | null;
};

export type ModelImageuserConditionInput = {
  userID?: ModelIDInput | null;
  image?: ModelStringInput | null;
  text?: ModelStringInput | null;
  and?: Array<ModelImageuserConditionInput | null> | null;
  or?: Array<ModelImageuserConditionInput | null> | null;
  not?: ModelImageuserConditionInput | null;
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

export type Imageuser = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateImageuserInput = {
  id: string;
  userID?: string | null;
  image?: string | null;
  text?: string | null;
};

export type DeleteImageuserInput = {
  id: string;
};

export type CreateFollowersInput = {
  id?: string | null;
  friendsID: string;
  userId: string;
};

export type ModelFollowersConditionInput = {
  friendsID?: ModelIDInput | null;
  userId?: ModelStringInput | null;
  and?: Array<ModelFollowersConditionInput | null> | null;
  or?: Array<ModelFollowersConditionInput | null> | null;
  not?: ModelFollowersConditionInput | null;
};

export type Followers = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateFollowersInput = {
  id: string;
  friendsID?: string | null;
  userId?: string | null;
};

export type DeleteFollowersInput = {
  id: string;
};

export type CreateFollowingInput = {
  id?: string | null;
  friendsID: string;
  userId: string;
};

export type ModelFollowingConditionInput = {
  friendsID?: ModelIDInput | null;
  userId?: ModelStringInput | null;
  and?: Array<ModelFollowingConditionInput | null> | null;
  or?: Array<ModelFollowingConditionInput | null> | null;
  not?: ModelFollowingConditionInput | null;
};

export type Following = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateFollowingInput = {
  id: string;
  friendsID?: string | null;
  userId?: string | null;
};

export type DeleteFollowingInput = {
  id: string;
};

export type CreateFriendsInput = {
  id?: string | null;
};

export type ModelFriendsConditionInput = {
  and?: Array<ModelFriendsConditionInput | null> | null;
  or?: Array<ModelFriendsConditionInput | null> | null;
  not?: ModelFriendsConditionInput | null;
};

export type Friends = {
  __typename: "Friends";
  id: string;
  Followings?: ModelFollowingConnection | null;
  Followers?: ModelFollowersConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelFollowingConnection = {
  __typename: "ModelFollowingConnection";
  items: Array<Following | null>;
  nextToken?: string | null;
};

export type ModelFollowersConnection = {
  __typename: "ModelFollowersConnection";
  items: Array<Followers | null>;
  nextToken?: string | null;
};

export type UpdateFriendsInput = {
  id: string;
};

export type DeleteFriendsInput = {
  id: string;
};

export type CreateChatroomInput = {
  id?: string | null;
  chatroomLastMessageId?: string | null;
};

export type ModelChatroomConditionInput = {
  and?: Array<ModelChatroomConditionInput | null> | null;
  or?: Array<ModelChatroomConditionInput | null> | null;
  not?: ModelChatroomConditionInput | null;
  chatroomLastMessageId?: ModelIDInput | null;
};

export type Chatroom = {
  __typename: "Chatroom";
  id: string;
  Messages?: ModelMessageConnection | null;
  users?: ModelUserChatroomConnection | null;
  LastMessage?: Message | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection";
  items: Array<Message | null>;
  nextToken?: string | null;
};

export type Message = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelUserChatroomConnection = {
  __typename: "ModelUserChatroomConnection";
  items: Array<UserChatroom | null>;
  nextToken?: string | null;
};

export type UserChatroom = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: Chatroom;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  __typename: "User";
  id: string;
  name?: string | null;
  userid?: string | null;
  status?: string | null;
  Messages?: ModelMessageConnection | null;
  Chatrooms?: ModelUserChatroomConnection | null;
  Posts?: ModelUserPostConnection | null;
  profilepicture?: string | null;
  Comments?: ModelImageuserConnection | null;
  cover?: string | null;
  Friends?: Friends | null;
  Imagesusers?: ModelImageuserConnection | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: ModelLikepostConnection | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type ModelUserPostConnection = {
  __typename: "ModelUserPostConnection";
  items: Array<UserPost | null>;
  nextToken?: string | null;
};

export type UserPost = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: User;
  post: Post;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: ModelCommentConnection | null;
  userid?: string | null;
  users?: ModelUserPostConnection | null;
  images?: Array<string | null> | null;
  Likeposts?: ModelLikepostConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection";
  items: Array<Comment | null>;
  nextToken?: string | null;
};

export type Comment = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelLikepostConnection = {
  __typename: "ModelLikepostConnection";
  items: Array<Likepost | null>;
  nextToken?: string | null;
};

export type ModelImageuserConnection = {
  __typename: "ModelImageuserConnection";
  items: Array<Imageuser | null>;
  nextToken?: string | null;
};

export type UpdateChatroomInput = {
  id: string;
  chatroomLastMessageId?: string | null;
};

export type DeleteChatroomInput = {
  id: string;
};

export type CreateMessageInput = {
  id?: string | null;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
};

export type ModelMessageConditionInput = {
  text?: ModelStringInput | null;
  chatroomID?: ModelIDInput | null;
  images?: ModelStringInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelMessageConditionInput | null> | null;
  or?: Array<ModelMessageConditionInput | null> | null;
  not?: ModelMessageConditionInput | null;
};

export type UpdateMessageInput = {
  id: string;
  text?: string | null;
  chatroomID?: string | null;
  images?: Array<string | null> | null;
  userID?: string | null;
};

export type DeleteMessageInput = {
  id: string;
};

export type CreateUserInput = {
  id?: string | null;
  name?: string | null;
  userid?: string | null;
  status?: string | null;
  profilepicture?: string | null;
  cover?: string | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  userFriendsId?: string | null;
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null;
  userid?: ModelStringInput | null;
  status?: ModelStringInput | null;
  profilepicture?: ModelStringInput | null;
  cover?: ModelStringInput | null;
  notificationsseen?: ModelStringInput | null;
  messagesseen?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
  userFriendsId?: ModelIDInput | null;
};

export type UpdateUserInput = {
  id: string;
  name?: string | null;
  userid?: string | null;
  status?: string | null;
  profilepicture?: string | null;
  cover?: string | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  userFriendsId?: string | null;
};

export type DeleteUserInput = {
  id: string;
};

export type CreateCommentInput = {
  id?: string | null;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
};

export type ModelCommentConditionInput = {
  text?: ModelStringInput | null;
  postID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  images?: ModelStringInput | null;
  and?: Array<ModelCommentConditionInput | null> | null;
  or?: Array<ModelCommentConditionInput | null> | null;
  not?: ModelCommentConditionInput | null;
};

export type UpdateCommentInput = {
  id: string;
  text?: string | null;
  postID?: string | null;
  userID?: string | null;
  images?: Array<string | null> | null;
};

export type DeleteCommentInput = {
  id: string;
};

export type CreatePostInput = {
  id?: string | null;
  text?: string | null;
  userid?: string | null;
  images?: Array<string | null> | null;
};

export type ModelPostConditionInput = {
  text?: ModelStringInput | null;
  userid?: ModelStringInput | null;
  images?: ModelStringInput | null;
  and?: Array<ModelPostConditionInput | null> | null;
  or?: Array<ModelPostConditionInput | null> | null;
  not?: ModelPostConditionInput | null;
};

export type UpdatePostInput = {
  id: string;
  text?: string | null;
  userid?: string | null;
  images?: Array<string | null> | null;
};

export type DeletePostInput = {
  id: string;
};

export type CreateUserChatroomInput = {
  id?: string | null;
  chatroomId: string;
  userId: string;
};

export type ModelUserChatroomConditionInput = {
  chatroomId?: ModelIDInput | null;
  userId?: ModelIDInput | null;
  and?: Array<ModelUserChatroomConditionInput | null> | null;
  or?: Array<ModelUserChatroomConditionInput | null> | null;
  not?: ModelUserChatroomConditionInput | null;
};

export type UpdateUserChatroomInput = {
  id: string;
  chatroomId?: string | null;
  userId?: string | null;
};

export type DeleteUserChatroomInput = {
  id: string;
};

export type CreateUserPostInput = {
  id?: string | null;
  userId: string;
  postId: string;
};

export type ModelUserPostConditionInput = {
  userId?: ModelIDInput | null;
  postId?: ModelIDInput | null;
  and?: Array<ModelUserPostConditionInput | null> | null;
  or?: Array<ModelUserPostConditionInput | null> | null;
  not?: ModelUserPostConditionInput | null;
};

export type UpdateUserPostInput = {
  id: string;
  userId?: string | null;
  postId?: string | null;
};

export type DeleteUserPostInput = {
  id: string;
};

export type ModelLikepostFilterInput = {
  id?: ModelIDInput | null;
  postID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelLikepostFilterInput | null> | null;
  or?: Array<ModelLikepostFilterInput | null> | null;
  not?: ModelLikepostFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelImageuserFilterInput = {
  id?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  image?: ModelStringInput | null;
  text?: ModelStringInput | null;
  and?: Array<ModelImageuserFilterInput | null> | null;
  or?: Array<ModelImageuserFilterInput | null> | null;
  not?: ModelImageuserFilterInput | null;
};

export type ModelFollowersFilterInput = {
  id?: ModelIDInput | null;
  friendsID?: ModelIDInput | null;
  userId?: ModelStringInput | null;
  and?: Array<ModelFollowersFilterInput | null> | null;
  or?: Array<ModelFollowersFilterInput | null> | null;
  not?: ModelFollowersFilterInput | null;
};

export type ModelFollowingFilterInput = {
  id?: ModelIDInput | null;
  friendsID?: ModelIDInput | null;
  userId?: ModelStringInput | null;
  and?: Array<ModelFollowingFilterInput | null> | null;
  or?: Array<ModelFollowingFilterInput | null> | null;
  not?: ModelFollowingFilterInput | null;
};

export type ModelFriendsFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelFriendsFilterInput | null> | null;
  or?: Array<ModelFriendsFilterInput | null> | null;
  not?: ModelFriendsFilterInput | null;
};

export type ModelFriendsConnection = {
  __typename: "ModelFriendsConnection";
  items: Array<Friends | null>;
  nextToken?: string | null;
};

export type ModelChatroomFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelChatroomFilterInput | null> | null;
  or?: Array<ModelChatroomFilterInput | null> | null;
  not?: ModelChatroomFilterInput | null;
  chatroomLastMessageId?: ModelIDInput | null;
};

export type ModelChatroomConnection = {
  __typename: "ModelChatroomConnection";
  items: Array<Chatroom | null>;
  nextToken?: string | null;
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null;
  text?: ModelStringInput | null;
  chatroomID?: ModelIDInput | null;
  images?: ModelStringInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelMessageFilterInput | null> | null;
  or?: Array<ModelMessageFilterInput | null> | null;
  not?: ModelMessageFilterInput | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  userid?: ModelStringInput | null;
  status?: ModelStringInput | null;
  profilepicture?: ModelStringInput | null;
  cover?: ModelStringInput | null;
  notificationsseen?: ModelStringInput | null;
  messagesseen?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
  userFriendsId?: ModelIDInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null;
  text?: ModelStringInput | null;
  postID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  images?: ModelStringInput | null;
  and?: Array<ModelCommentFilterInput | null> | null;
  or?: Array<ModelCommentFilterInput | null> | null;
  not?: ModelCommentFilterInput | null;
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null;
  text?: ModelStringInput | null;
  userid?: ModelStringInput | null;
  images?: ModelStringInput | null;
  and?: Array<ModelPostFilterInput | null> | null;
  or?: Array<ModelPostFilterInput | null> | null;
  not?: ModelPostFilterInput | null;
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection";
  items: Array<Post | null>;
  nextToken?: string | null;
};

export type ModelUserChatroomFilterInput = {
  id?: ModelIDInput | null;
  chatroomId?: ModelIDInput | null;
  userId?: ModelIDInput | null;
  and?: Array<ModelUserChatroomFilterInput | null> | null;
  or?: Array<ModelUserChatroomFilterInput | null> | null;
  not?: ModelUserChatroomFilterInput | null;
};

export type ModelUserPostFilterInput = {
  id?: ModelIDInput | null;
  userId?: ModelIDInput | null;
  postId?: ModelIDInput | null;
  and?: Array<ModelUserPostFilterInput | null> | null;
  or?: Array<ModelUserPostFilterInput | null> | null;
  not?: ModelUserPostFilterInput | null;
};

export type ModelSubscriptionLikepostFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  postID?: ModelSubscriptionIDInput | null;
  userID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionLikepostFilterInput | null> | null;
  or?: Array<ModelSubscriptionLikepostFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
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
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionImageuserFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  userID?: ModelSubscriptionIDInput | null;
  image?: ModelSubscriptionStringInput | null;
  text?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionImageuserFilterInput | null> | null;
  or?: Array<ModelSubscriptionImageuserFilterInput | null> | null;
};

export type ModelSubscriptionStringInput = {
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
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionFollowersFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  friendsID?: ModelSubscriptionIDInput | null;
  userId?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionFollowersFilterInput | null> | null;
  or?: Array<ModelSubscriptionFollowersFilterInput | null> | null;
};

export type ModelSubscriptionFollowingFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  friendsID?: ModelSubscriptionIDInput | null;
  userId?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionFollowingFilterInput | null> | null;
  or?: Array<ModelSubscriptionFollowingFilterInput | null> | null;
};

export type ModelSubscriptionFriendsFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionFriendsFilterInput | null> | null;
  or?: Array<ModelSubscriptionFriendsFilterInput | null> | null;
};

export type ModelSubscriptionChatroomFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionChatroomFilterInput | null> | null;
  or?: Array<ModelSubscriptionChatroomFilterInput | null> | null;
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  text?: ModelSubscriptionStringInput | null;
  chatroomID?: ModelSubscriptionIDInput | null;
  images?: ModelSubscriptionStringInput | null;
  userID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionMessageFilterInput | null> | null;
  or?: Array<ModelSubscriptionMessageFilterInput | null> | null;
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  userid?: ModelSubscriptionStringInput | null;
  status?: ModelSubscriptionStringInput | null;
  profilepicture?: ModelSubscriptionStringInput | null;
  cover?: ModelSubscriptionStringInput | null;
  notificationsseen?: ModelSubscriptionStringInput | null;
  messagesseen?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  text?: ModelSubscriptionStringInput | null;
  postID?: ModelSubscriptionIDInput | null;
  userID?: ModelSubscriptionIDInput | null;
  images?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionCommentFilterInput | null> | null;
  or?: Array<ModelSubscriptionCommentFilterInput | null> | null;
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  text?: ModelSubscriptionStringInput | null;
  userid?: ModelSubscriptionStringInput | null;
  images?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPostFilterInput | null> | null;
  or?: Array<ModelSubscriptionPostFilterInput | null> | null;
};

export type ModelSubscriptionUserChatroomFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  chatroomId?: ModelSubscriptionIDInput | null;
  userId?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionUserChatroomFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserChatroomFilterInput | null> | null;
};

export type ModelSubscriptionUserPostFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  userId?: ModelSubscriptionIDInput | null;
  postId?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionUserPostFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserPostFilterInput | null> | null;
};

export type CreateLikepostMutation = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateLikepostMutation = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteLikepostMutation = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateImageuserMutation = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateImageuserMutation = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteImageuserMutation = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateFollowersMutation = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateFollowersMutation = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteFollowersMutation = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFollowingMutation = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateFollowingMutation = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteFollowingMutation = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFriendsMutation = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateFriendsMutation = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteFriendsMutation = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateChatroomMutation = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type UpdateChatroomMutation = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type DeleteChatroomMutation = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type CreateMessageMutation = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMessageMutation = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteMessageMutation = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserMutation = {
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type UpdateUserMutation = {
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type DeleteUserMutation = {
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type CreateCommentMutation = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCommentMutation = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCommentMutation = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostMutation = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePostMutation = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeletePostMutation = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserChatroomMutation = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserChatroomMutation = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserChatroomMutation = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateUserPostMutation = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserPostMutation = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserPostMutation = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetLikepostQuery = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type ListLikepostsQuery = {
  __typename: "ModelLikepostConnection";
  items: Array<{
    __typename: "Likepost";
    id: string;
    postID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type LikepostsByPostIDQuery = {
  __typename: "ModelLikepostConnection";
  items: Array<{
    __typename: "Likepost";
    id: string;
    postID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type LikepostsByUserIDQuery = {
  __typename: "ModelLikepostConnection";
  items: Array<{
    __typename: "Likepost";
    id: string;
    postID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetImageuserQuery = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListImageusersQuery = {
  __typename: "ModelImageuserConnection";
  items: Array<{
    __typename: "Imageuser";
    id: string;
    userID: string;
    image: string;
    text?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ImageusersByUserIDQuery = {
  __typename: "ModelImageuserConnection";
  items: Array<{
    __typename: "Imageuser";
    id: string;
    userID: string;
    image: string;
    text?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetFollowersQuery = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ListFollowersQuery = {
  __typename: "ModelFollowersConnection";
  items: Array<{
    __typename: "Followers";
    id: string;
    friendsID: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type FollowersByFriendsIDQuery = {
  __typename: "ModelFollowersConnection";
  items: Array<{
    __typename: "Followers";
    id: string;
    friendsID: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetFollowingQuery = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ListFollowingsQuery = {
  __typename: "ModelFollowingConnection";
  items: Array<{
    __typename: "Following";
    id: string;
    friendsID: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type FollowingsByFriendsIDQuery = {
  __typename: "ModelFollowingConnection";
  items: Array<{
    __typename: "Following";
    id: string;
    friendsID: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetFriendsQuery = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListFriendsQuery = {
  __typename: "ModelFriendsConnection";
  items: Array<{
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetChatroomQuery = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

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

export type GetMessageQuery = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type ListMessagesQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type MessagesByChatroomIDQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type MessagesByUserIDQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetCommentQuery = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCommentsQuery = {
  __typename: "ModelCommentConnection";
  items: Array<{
    __typename: "Comment";
    id: string;
    text?: string | null;
    postID: string;
    userID: string;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type CommentsByPostIDQuery = {
  __typename: "ModelCommentConnection";
  items: Array<{
    __typename: "Comment";
    id: string;
    text?: string | null;
    postID: string;
    userID: string;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type CommentsByUserIDQuery = {
  __typename: "ModelCommentConnection";
  items: Array<{
    __typename: "Comment";
    id: string;
    text?: string | null;
    postID: string;
    userID: string;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetPostQuery = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListPostsQuery = {
  __typename: "ModelPostConnection";
  items: Array<{
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetUserChatroomQuery = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type ListUserChatroomsQuery = {
  __typename: "ModelUserChatroomConnection";
  items: Array<{
    __typename: "UserChatroom";
    id: string;
    chatroomId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type UserChatroomsByChatroomIdQuery = {
  __typename: "ModelUserChatroomConnection";
  items: Array<{
    __typename: "UserChatroom";
    id: string;
    chatroomId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type UserChatroomsByUserIdQuery = {
  __typename: "ModelUserChatroomConnection";
  items: Array<{
    __typename: "UserChatroom";
    id: string;
    chatroomId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetUserPostQuery = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ListUserPostsQuery = {
  __typename: "ModelUserPostConnection";
  items: Array<{
    __typename: "UserPost";
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type UserPostsByUserIdQuery = {
  __typename: "ModelUserPostConnection";
  items: Array<{
    __typename: "UserPost";
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type UserPostsByPostIdQuery = {
  __typename: "ModelUserPostConnection";
  items: Array<{
    __typename: "UserPost";
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateLikepostSubscription = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateLikepostSubscription = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteLikepostSubscription = {
  __typename: "Likepost";
  id: string;
  postID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateImageuserSubscription = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateImageuserSubscription = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteImageuserSubscription = {
  __typename: "Imageuser";
  id: string;
  userID: string;
  image: string;
  text?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateFollowersSubscription = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateFollowersSubscription = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteFollowersSubscription = {
  __typename: "Followers";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateFollowingSubscription = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateFollowingSubscription = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteFollowingSubscription = {
  __typename: "Following";
  id: string;
  friendsID: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateFriendsSubscription = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateFriendsSubscription = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteFriendsSubscription = {
  __typename: "Friends";
  id: string;
  Followings?: {
    __typename: "ModelFollowingConnection";
    nextToken?: string | null;
  } | null;
  Followers?: {
    __typename: "ModelFollowersConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateChatroomSubscription = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type OnUpdateChatroomSubscription = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type OnDeleteChatroomSubscription = {
  __typename: "Chatroom";
  id: string;
  Messages?: {
    __typename: "ModelMessageConnection";
    nextToken?: string | null;
  } | null;
  users?: {
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  LastMessage?: {
    __typename: "Message";
    id: string;
    text?: string | null;
    chatroomID: string;
    images?: Array<string | null> | null;
    userID: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatroomLastMessageId?: string | null;
};

export type OnCreateMessageSubscription = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateMessageSubscription = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteMessageSubscription = {
  __typename: "Message";
  id: string;
  text?: string | null;
  chatroomID: string;
  images?: Array<string | null> | null;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserSubscription = {
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type OnUpdateUserSubscription = {
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type OnDeleteUserSubscription = {
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
    __typename: "ModelUserChatroomConnection";
    nextToken?: string | null;
  } | null;
  Posts?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  profilepicture?: string | null;
  Comments?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  cover?: string | null;
  Friends?: {
    __typename: "Friends";
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  Imagesusers?: {
    __typename: "ModelImageuserConnection";
    nextToken?: string | null;
  } | null;
  notificationsseen?: string | null;
  messagesseen?: string | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  userFriendsId?: string | null;
};

export type OnCreateCommentSubscription = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCommentSubscription = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCommentSubscription = {
  __typename: "Comment";
  id: string;
  text?: string | null;
  postID: string;
  userID: string;
  images?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreatePostSubscription = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePostSubscription = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePostSubscription = {
  __typename: "Post";
  id: string;
  text?: string | null;
  Comments?: {
    __typename: "ModelCommentConnection";
    nextToken?: string | null;
  } | null;
  userid?: string | null;
  users?: {
    __typename: "ModelUserPostConnection";
    nextToken?: string | null;
  } | null;
  images?: Array<string | null> | null;
  Likeposts?: {
    __typename: "ModelLikepostConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserChatroomSubscription = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserChatroomSubscription = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserChatroomSubscription = {
  __typename: "UserChatroom";
  id: string;
  chatroomId: string;
  userId: string;
  chatroom: {
    __typename: "Chatroom";
    id: string;
    createdAt: string;
    updatedAt: string;
    chatroomLastMessageId?: string | null;
  };
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserPostSubscription = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserPostSubscription = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserPostSubscription = {
  __typename: "UserPost";
  id: string;
  userId: string;
  postId: string;
  user: {
    __typename: "User";
    id: string;
    name?: string | null;
    userid?: string | null;
    status?: string | null;
    profilepicture?: string | null;
    cover?: string | null;
    notificationsseen?: string | null;
    messagesseen?: string | null;
    createdAt: string;
    updatedAt: string;
    userFriendsId?: string | null;
  };
  post: {
    __typename: "Post";
    id: string;
    text?: string | null;
    userid?: string | null;
    images?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateLikepost(
    input: CreateLikepostInput,
    condition?: ModelLikepostConditionInput
  ): Promise<CreateLikepostMutation> {
    const statement = `mutation CreateLikepost($input: CreateLikepostInput!, $condition: ModelLikepostConditionInput) {
        createLikepost(input: $input, condition: $condition) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateLikepostMutation>response.data.createLikepost;
  }
  async UpdateLikepost(
    input: UpdateLikepostInput,
    condition?: ModelLikepostConditionInput
  ): Promise<UpdateLikepostMutation> {
    const statement = `mutation UpdateLikepost($input: UpdateLikepostInput!, $condition: ModelLikepostConditionInput) {
        updateLikepost(input: $input, condition: $condition) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateLikepostMutation>response.data.updateLikepost;
  }
  async DeleteLikepost(
    input: DeleteLikepostInput,
    condition?: ModelLikepostConditionInput
  ): Promise<DeleteLikepostMutation> {
    const statement = `mutation DeleteLikepost($input: DeleteLikepostInput!, $condition: ModelLikepostConditionInput) {
        deleteLikepost(input: $input, condition: $condition) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteLikepostMutation>response.data.deleteLikepost;
  }
  async CreateImageuser(
    input: CreateImageuserInput,
    condition?: ModelImageuserConditionInput
  ): Promise<CreateImageuserMutation> {
    const statement = `mutation CreateImageuser($input: CreateImageuserInput!, $condition: ModelImageuserConditionInput) {
        createImageuser(input: $input, condition: $condition) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateImageuserMutation>response.data.createImageuser;
  }
  async UpdateImageuser(
    input: UpdateImageuserInput,
    condition?: ModelImageuserConditionInput
  ): Promise<UpdateImageuserMutation> {
    const statement = `mutation UpdateImageuser($input: UpdateImageuserInput!, $condition: ModelImageuserConditionInput) {
        updateImageuser(input: $input, condition: $condition) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateImageuserMutation>response.data.updateImageuser;
  }
  async DeleteImageuser(
    input: DeleteImageuserInput,
    condition?: ModelImageuserConditionInput
  ): Promise<DeleteImageuserMutation> {
    const statement = `mutation DeleteImageuser($input: DeleteImageuserInput!, $condition: ModelImageuserConditionInput) {
        deleteImageuser(input: $input, condition: $condition) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteImageuserMutation>response.data.deleteImageuser;
  }
  async CreateFollowers(
    input: CreateFollowersInput,
    condition?: ModelFollowersConditionInput
  ): Promise<CreateFollowersMutation> {
    const statement = `mutation CreateFollowers($input: CreateFollowersInput!, $condition: ModelFollowersConditionInput) {
        createFollowers(input: $input, condition: $condition) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateFollowersMutation>response.data.createFollowers;
  }
  async UpdateFollowers(
    input: UpdateFollowersInput,
    condition?: ModelFollowersConditionInput
  ): Promise<UpdateFollowersMutation> {
    const statement = `mutation UpdateFollowers($input: UpdateFollowersInput!, $condition: ModelFollowersConditionInput) {
        updateFollowers(input: $input, condition: $condition) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateFollowersMutation>response.data.updateFollowers;
  }
  async DeleteFollowers(
    input: DeleteFollowersInput,
    condition?: ModelFollowersConditionInput
  ): Promise<DeleteFollowersMutation> {
    const statement = `mutation DeleteFollowers($input: DeleteFollowersInput!, $condition: ModelFollowersConditionInput) {
        deleteFollowers(input: $input, condition: $condition) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteFollowersMutation>response.data.deleteFollowers;
  }
  async CreateFollowing(
    input: CreateFollowingInput,
    condition?: ModelFollowingConditionInput
  ): Promise<CreateFollowingMutation> {
    const statement = `mutation CreateFollowing($input: CreateFollowingInput!, $condition: ModelFollowingConditionInput) {
        createFollowing(input: $input, condition: $condition) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateFollowingMutation>response.data.createFollowing;
  }
  async UpdateFollowing(
    input: UpdateFollowingInput,
    condition?: ModelFollowingConditionInput
  ): Promise<UpdateFollowingMutation> {
    const statement = `mutation UpdateFollowing($input: UpdateFollowingInput!, $condition: ModelFollowingConditionInput) {
        updateFollowing(input: $input, condition: $condition) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateFollowingMutation>response.data.updateFollowing;
  }
  async DeleteFollowing(
    input: DeleteFollowingInput,
    condition?: ModelFollowingConditionInput
  ): Promise<DeleteFollowingMutation> {
    const statement = `mutation DeleteFollowing($input: DeleteFollowingInput!, $condition: ModelFollowingConditionInput) {
        deleteFollowing(input: $input, condition: $condition) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteFollowingMutation>response.data.deleteFollowing;
  }
  async CreateFriends(
    input: CreateFriendsInput,
    condition?: ModelFriendsConditionInput
  ): Promise<CreateFriendsMutation> {
    const statement = `mutation CreateFriends($input: CreateFriendsInput!, $condition: ModelFriendsConditionInput) {
        createFriends(input: $input, condition: $condition) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateFriendsMutation>response.data.createFriends;
  }
  async UpdateFriends(
    input: UpdateFriendsInput,
    condition?: ModelFriendsConditionInput
  ): Promise<UpdateFriendsMutation> {
    const statement = `mutation UpdateFriends($input: UpdateFriendsInput!, $condition: ModelFriendsConditionInput) {
        updateFriends(input: $input, condition: $condition) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateFriendsMutation>response.data.updateFriends;
  }
  async DeleteFriends(
    input: DeleteFriendsInput,
    condition?: ModelFriendsConditionInput
  ): Promise<DeleteFriendsMutation> {
    const statement = `mutation DeleteFriends($input: DeleteFriendsInput!, $condition: ModelFriendsConditionInput) {
        deleteFriends(input: $input, condition: $condition) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteFriendsMutation>response.data.deleteFriends;
  }
  async CreateChatroom(
    input: CreateChatroomInput,
    condition?: ModelChatroomConditionInput
  ): Promise<CreateChatroomMutation> {
    const statement = `mutation CreateChatroom($input: CreateChatroomInput!, $condition: ModelChatroomConditionInput) {
        createChatroom(input: $input, condition: $condition) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
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
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateChatroomMutation>response.data.createChatroom;
  }
  async UpdateChatroom(
    input: UpdateChatroomInput,
    condition?: ModelChatroomConditionInput
  ): Promise<UpdateChatroomMutation> {
    const statement = `mutation UpdateChatroom($input: UpdateChatroomInput!, $condition: ModelChatroomConditionInput) {
        updateChatroom(input: $input, condition: $condition) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
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
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateChatroomMutation>response.data.updateChatroom;
  }
  async DeleteChatroom(
    input: DeleteChatroomInput,
    condition?: ModelChatroomConditionInput
  ): Promise<DeleteChatroomMutation> {
    const statement = `mutation DeleteChatroom($input: DeleteChatroomInput!, $condition: ModelChatroomConditionInput) {
        deleteChatroom(input: $input, condition: $condition) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
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
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteChatroomMutation>response.data.deleteChatroom;
  }
  async CreateMessage(
    input: CreateMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<CreateMessageMutation> {
    const statement = `mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
        createMessage(input: $input, condition: $condition) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMessageMutation>response.data.createMessage;
  }
  async UpdateMessage(
    input: UpdateMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<UpdateMessageMutation> {
    const statement = `mutation UpdateMessage($input: UpdateMessageInput!, $condition: ModelMessageConditionInput) {
        updateMessage(input: $input, condition: $condition) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMessageMutation>response.data.updateMessage;
  }
  async DeleteMessage(
    input: DeleteMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<DeleteMessageMutation> {
    const statement = `mutation DeleteMessage($input: DeleteMessageInput!, $condition: ModelMessageConditionInput) {
        deleteMessage(input: $input, condition: $condition) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMessageMutation>response.data.deleteMessage;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CreateComment(
    input: CreateCommentInput,
    condition?: ModelCommentConditionInput
  ): Promise<CreateCommentMutation> {
    const statement = `mutation CreateComment($input: CreateCommentInput!, $condition: ModelCommentConditionInput) {
        createComment(input: $input, condition: $condition) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCommentMutation>response.data.createComment;
  }
  async UpdateComment(
    input: UpdateCommentInput,
    condition?: ModelCommentConditionInput
  ): Promise<UpdateCommentMutation> {
    const statement = `mutation UpdateComment($input: UpdateCommentInput!, $condition: ModelCommentConditionInput) {
        updateComment(input: $input, condition: $condition) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCommentMutation>response.data.updateComment;
  }
  async DeleteComment(
    input: DeleteCommentInput,
    condition?: ModelCommentConditionInput
  ): Promise<DeleteCommentMutation> {
    const statement = `mutation DeleteComment($input: DeleteCommentInput!, $condition: ModelCommentConditionInput) {
        deleteComment(input: $input, condition: $condition) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCommentMutation>response.data.deleteComment;
  }
  async CreatePost(
    input: CreatePostInput,
    condition?: ModelPostConditionInput
  ): Promise<CreatePostMutation> {
    const statement = `mutation CreatePost($input: CreatePostInput!, $condition: ModelPostConditionInput) {
        createPost(input: $input, condition: $condition) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePostMutation>response.data.createPost;
  }
  async UpdatePost(
    input: UpdatePostInput,
    condition?: ModelPostConditionInput
  ): Promise<UpdatePostMutation> {
    const statement = `mutation UpdatePost($input: UpdatePostInput!, $condition: ModelPostConditionInput) {
        updatePost(input: $input, condition: $condition) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePostMutation>response.data.updatePost;
  }
  async DeletePost(
    input: DeletePostInput,
    condition?: ModelPostConditionInput
  ): Promise<DeletePostMutation> {
    const statement = `mutation DeletePost($input: DeletePostInput!, $condition: ModelPostConditionInput) {
        deletePost(input: $input, condition: $condition) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePostMutation>response.data.deletePost;
  }
  async CreateUserChatroom(
    input: CreateUserChatroomInput,
    condition?: ModelUserChatroomConditionInput
  ): Promise<CreateUserChatroomMutation> {
    const statement = `mutation CreateUserChatroom($input: CreateUserChatroomInput!, $condition: ModelUserChatroomConditionInput) {
        createUserChatroom(input: $input, condition: $condition) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserChatroomMutation>response.data.createUserChatroom;
  }
  async UpdateUserChatroom(
    input: UpdateUserChatroomInput,
    condition?: ModelUserChatroomConditionInput
  ): Promise<UpdateUserChatroomMutation> {
    const statement = `mutation UpdateUserChatroom($input: UpdateUserChatroomInput!, $condition: ModelUserChatroomConditionInput) {
        updateUserChatroom(input: $input, condition: $condition) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserChatroomMutation>response.data.updateUserChatroom;
  }
  async DeleteUserChatroom(
    input: DeleteUserChatroomInput,
    condition?: ModelUserChatroomConditionInput
  ): Promise<DeleteUserChatroomMutation> {
    const statement = `mutation DeleteUserChatroom($input: DeleteUserChatroomInput!, $condition: ModelUserChatroomConditionInput) {
        deleteUserChatroom(input: $input, condition: $condition) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserChatroomMutation>response.data.deleteUserChatroom;
  }
  async CreateUserPost(
    input: CreateUserPostInput,
    condition?: ModelUserPostConditionInput
  ): Promise<CreateUserPostMutation> {
    const statement = `mutation CreateUserPost($input: CreateUserPostInput!, $condition: ModelUserPostConditionInput) {
        createUserPost(input: $input, condition: $condition) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserPostMutation>response.data.createUserPost;
  }
  async UpdateUserPost(
    input: UpdateUserPostInput,
    condition?: ModelUserPostConditionInput
  ): Promise<UpdateUserPostMutation> {
    const statement = `mutation UpdateUserPost($input: UpdateUserPostInput!, $condition: ModelUserPostConditionInput) {
        updateUserPost(input: $input, condition: $condition) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserPostMutation>response.data.updateUserPost;
  }
  async DeleteUserPost(
    input: DeleteUserPostInput,
    condition?: ModelUserPostConditionInput
  ): Promise<DeleteUserPostMutation> {
    const statement = `mutation DeleteUserPost($input: DeleteUserPostInput!, $condition: ModelUserPostConditionInput) {
        deleteUserPost(input: $input, condition: $condition) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserPostMutation>response.data.deleteUserPost;
  }
  async GetLikepost(id: string): Promise<GetLikepostQuery> {
    const statement = `query GetLikepost($id: ID!) {
        getLikepost(id: $id) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLikepostQuery>response.data.getLikepost;
  }
  async ListLikeposts(
    filter?: ModelLikepostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListLikepostsQuery> {
    const statement = `query ListLikeposts($filter: ModelLikepostFilterInput, $limit: Int, $nextToken: String) {
        listLikeposts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            postID
            userID
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListLikepostsQuery>response.data.listLikeposts;
  }
  async LikepostsByPostID(
    postID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelLikepostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<LikepostsByPostIDQuery> {
    const statement = `query LikepostsByPostID($postID: ID!, $sortDirection: ModelSortDirection, $filter: ModelLikepostFilterInput, $limit: Int, $nextToken: String) {
        likepostsByPostID(
          postID: $postID
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            postID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      postID
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
    return <LikepostsByPostIDQuery>response.data.likepostsByPostID;
  }
  async LikepostsByUserID(
    userID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelLikepostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<LikepostsByUserIDQuery> {
    const statement = `query LikepostsByUserID($userID: ID!, $sortDirection: ModelSortDirection, $filter: ModelLikepostFilterInput, $limit: Int, $nextToken: String) {
        likepostsByUserID(
          userID: $userID
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            postID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userID
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
    return <LikepostsByUserIDQuery>response.data.likepostsByUserID;
  }
  async GetImageuser(id: string): Promise<GetImageuserQuery> {
    const statement = `query GetImageuser($id: ID!) {
        getImageuser(id: $id) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImageuserQuery>response.data.getImageuser;
  }
  async ListImageusers(
    filter?: ModelImageuserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListImageusersQuery> {
    const statement = `query ListImageusers($filter: ModelImageuserFilterInput, $limit: Int, $nextToken: String) {
        listImageusers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userID
            image
            text
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListImageusersQuery>response.data.listImageusers;
  }
  async ImageusersByUserID(
    userID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelImageuserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ImageusersByUserIDQuery> {
    const statement = `query ImageusersByUserID($userID: ID!, $sortDirection: ModelSortDirection, $filter: ModelImageuserFilterInput, $limit: Int, $nextToken: String) {
        imageusersByUserID(
          userID: $userID
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            userID
            image
            text
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userID
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
    return <ImageusersByUserIDQuery>response.data.imageusersByUserID;
  }
  async GetFollowers(id: string): Promise<GetFollowersQuery> {
    const statement = `query GetFollowers($id: ID!) {
        getFollowers(id: $id) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFollowersQuery>response.data.getFollowers;
  }
  async ListFollowers(
    filter?: ModelFollowersFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListFollowersQuery> {
    const statement = `query ListFollowers($filter: ModelFollowersFilterInput, $limit: Int, $nextToken: String) {
        listFollowers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            friendsID
            userId
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListFollowersQuery>response.data.listFollowers;
  }
  async FollowersByFriendsID(
    friendsID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelFollowersFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<FollowersByFriendsIDQuery> {
    const statement = `query FollowersByFriendsID($friendsID: ID!, $sortDirection: ModelSortDirection, $filter: ModelFollowersFilterInput, $limit: Int, $nextToken: String) {
        followersByFriendsID(
          friendsID: $friendsID
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            friendsID
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      friendsID
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
    return <FollowersByFriendsIDQuery>response.data.followersByFriendsID;
  }
  async GetFollowing(id: string): Promise<GetFollowingQuery> {
    const statement = `query GetFollowing($id: ID!) {
        getFollowing(id: $id) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFollowingQuery>response.data.getFollowing;
  }
  async ListFollowings(
    filter?: ModelFollowingFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListFollowingsQuery> {
    const statement = `query ListFollowings($filter: ModelFollowingFilterInput, $limit: Int, $nextToken: String) {
        listFollowings(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            friendsID
            userId
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListFollowingsQuery>response.data.listFollowings;
  }
  async FollowingsByFriendsID(
    friendsID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelFollowingFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<FollowingsByFriendsIDQuery> {
    const statement = `query FollowingsByFriendsID($friendsID: ID!, $sortDirection: ModelSortDirection, $filter: ModelFollowingFilterInput, $limit: Int, $nextToken: String) {
        followingsByFriendsID(
          friendsID: $friendsID
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            friendsID
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      friendsID
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
    return <FollowingsByFriendsIDQuery>response.data.followingsByFriendsID;
  }
  async GetFriends(id: string): Promise<GetFriendsQuery> {
    const statement = `query GetFriends($id: ID!) {
        getFriends(id: $id) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFriendsQuery>response.data.getFriends;
  }
  async ListFriends(
    filter?: ModelFriendsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListFriendsQuery> {
    const statement = `query ListFriends($filter: ModelFriendsFilterInput, $limit: Int, $nextToken: String) {
        listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListFriendsQuery>response.data.listFriends;
  }
  async GetChatroom(id: string): Promise<GetChatroomQuery> {
    const statement = `query GetChatroom($id: ID!) {
        getChatroom(id: $id) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
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
  async ListChatrooms(
    filter?: ModelChatroomFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListChatroomsQuery> {
    const statement = `query ListChatrooms($filter: ModelChatroomFilterInput, $limit: Int, $nextToken: String) {
        listChatrooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          nextToken
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
  async GetMessage(id: string): Promise<GetMessageQuery> {
    const statement = `query GetMessage($id: ID!) {
        getMessage(id: $id) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMessageQuery>response.data.getMessage;
  }
  async ListMessages(
    filter?: ModelMessageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMessagesQuery> {
    const statement = `query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
        listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            text
            chatroomID
            images
            userID
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListMessagesQuery>response.data.listMessages;
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
            images
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
  async MessagesByUserID(
    userID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelMessageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<MessagesByUserIDQuery> {
    const statement = `query MessagesByUserID($userID: ID!, $sortDirection: ModelSortDirection, $filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
        messagesByUserID(
          userID: $userID
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
            images
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userID
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
    return <MessagesByUserIDQuery>response.data.messagesByUserID;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
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
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          nextToken
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
    return <ListUsersQuery>response.data.listUsers;
  }
  async GetComment(id: string): Promise<GetCommentQuery> {
    const statement = `query GetComment($id: ID!) {
        getComment(id: $id) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCommentQuery>response.data.getComment;
  }
  async ListComments(
    filter?: ModelCommentFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCommentsQuery> {
    const statement = `query ListComments($filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
        listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            text
            postID
            userID
            images
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListCommentsQuery>response.data.listComments;
  }
  async CommentsByPostID(
    postID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelCommentFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<CommentsByPostIDQuery> {
    const statement = `query CommentsByPostID($postID: ID!, $sortDirection: ModelSortDirection, $filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
        commentsByPostID(
          postID: $postID
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
            postID
            userID
            images
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      postID
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
    return <CommentsByPostIDQuery>response.data.commentsByPostID;
  }
  async CommentsByUserID(
    userID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelCommentFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<CommentsByUserIDQuery> {
    const statement = `query CommentsByUserID($userID: ID!, $sortDirection: ModelSortDirection, $filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
        commentsByUserID(
          userID: $userID
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
            postID
            userID
            images
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userID
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
    return <CommentsByUserIDQuery>response.data.commentsByUserID;
  }
  async GetPost(id: string): Promise<GetPostQuery> {
    const statement = `query GetPost($id: ID!) {
        getPost(id: $id) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPostQuery>response.data.getPost;
  }
  async ListPosts(
    filter?: ModelPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPostsQuery> {
    const statement = `query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
        listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListPostsQuery>response.data.listPosts;
  }
  async GetUserChatroom(id: string): Promise<GetUserChatroomQuery> {
    const statement = `query GetUserChatroom($id: ID!) {
        getUserChatroom(id: $id) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserChatroomQuery>response.data.getUserChatroom;
  }
  async ListUserChatrooms(
    filter?: ModelUserChatroomFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUserChatroomsQuery> {
    const statement = `query ListUserChatrooms($filter: ModelUserChatroomFilterInput, $limit: Int, $nextToken: String) {
        listUserChatrooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            chatroomId
            userId
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListUserChatroomsQuery>response.data.listUserChatrooms;
  }
  async UserChatroomsByChatroomId(
    chatroomId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserChatroomFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<UserChatroomsByChatroomIdQuery> {
    const statement = `query UserChatroomsByChatroomId($chatroomId: ID!, $sortDirection: ModelSortDirection, $filter: ModelUserChatroomFilterInput, $limit: Int, $nextToken: String) {
        userChatroomsByChatroomId(
          chatroomId: $chatroomId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            chatroomId
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      chatroomId
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
    return <UserChatroomsByChatroomIdQuery>(
      response.data.userChatroomsByChatroomId
    );
  }
  async UserChatroomsByUserId(
    userId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserChatroomFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<UserChatroomsByUserIdQuery> {
    const statement = `query UserChatroomsByUserId($userId: ID!, $sortDirection: ModelSortDirection, $filter: ModelUserChatroomFilterInput, $limit: Int, $nextToken: String) {
        userChatroomsByUserId(
          userId: $userId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            chatroomId
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
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
    return <UserChatroomsByUserIdQuery>response.data.userChatroomsByUserId;
  }
  async GetUserPost(id: string): Promise<GetUserPostQuery> {
    const statement = `query GetUserPost($id: ID!) {
        getUserPost(id: $id) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserPostQuery>response.data.getUserPost;
  }
  async ListUserPosts(
    filter?: ModelUserPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUserPostsQuery> {
    const statement = `query ListUserPosts($filter: ModelUserPostFilterInput, $limit: Int, $nextToken: String) {
        listUserPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userId
            postId
            createdAt
            updatedAt
          }
          nextToken
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
    return <ListUserPostsQuery>response.data.listUserPosts;
  }
  async UserPostsByUserId(
    userId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<UserPostsByUserIdQuery> {
    const statement = `query UserPostsByUserId($userId: ID!, $sortDirection: ModelSortDirection, $filter: ModelUserPostFilterInput, $limit: Int, $nextToken: String) {
        userPostsByUserId(
          userId: $userId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            userId
            postId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
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
    return <UserPostsByUserIdQuery>response.data.userPostsByUserId;
  }
  async UserPostsByPostId(
    postId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<UserPostsByPostIdQuery> {
    const statement = `query UserPostsByPostId($postId: ID!, $sortDirection: ModelSortDirection, $filter: ModelUserPostFilterInput, $limit: Int, $nextToken: String) {
        userPostsByPostId(
          postId: $postId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            userId
            postId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      postId
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
    return <UserPostsByPostIdQuery>response.data.userPostsByPostId;
  }
  OnCreateLikepostListener(
    filter?: ModelSubscriptionLikepostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateLikepost">>
  > {
    const statement = `subscription OnCreateLikepost($filter: ModelSubscriptionLikepostFilterInput) {
        onCreateLikepost(filter: $filter) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateLikepost">>
    >;
  }

  OnUpdateLikepostListener(
    filter?: ModelSubscriptionLikepostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateLikepost">>
  > {
    const statement = `subscription OnUpdateLikepost($filter: ModelSubscriptionLikepostFilterInput) {
        onUpdateLikepost(filter: $filter) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateLikepost">>
    >;
  }

  OnDeleteLikepostListener(
    filter?: ModelSubscriptionLikepostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteLikepost">>
  > {
    const statement = `subscription OnDeleteLikepost($filter: ModelSubscriptionLikepostFilterInput) {
        onDeleteLikepost(filter: $filter) {
          __typename
          id
          postID
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteLikepost">>
    >;
  }

  OnCreateImageuserListener(
    filter?: ModelSubscriptionImageuserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImageuser">>
  > {
    const statement = `subscription OnCreateImageuser($filter: ModelSubscriptionImageuserFilterInput) {
        onCreateImageuser(filter: $filter) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImageuser">>
    >;
  }

  OnUpdateImageuserListener(
    filter?: ModelSubscriptionImageuserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImageuser">>
  > {
    const statement = `subscription OnUpdateImageuser($filter: ModelSubscriptionImageuserFilterInput) {
        onUpdateImageuser(filter: $filter) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImageuser">>
    >;
  }

  OnDeleteImageuserListener(
    filter?: ModelSubscriptionImageuserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImageuser">>
  > {
    const statement = `subscription OnDeleteImageuser($filter: ModelSubscriptionImageuserFilterInput) {
        onDeleteImageuser(filter: $filter) {
          __typename
          id
          userID
          image
          text
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImageuser">>
    >;
  }

  OnCreateFollowersListener(
    filter?: ModelSubscriptionFollowersFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFollowers">>
  > {
    const statement = `subscription OnCreateFollowers($filter: ModelSubscriptionFollowersFilterInput) {
        onCreateFollowers(filter: $filter) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFollowers">>
    >;
  }

  OnUpdateFollowersListener(
    filter?: ModelSubscriptionFollowersFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFollowers">>
  > {
    const statement = `subscription OnUpdateFollowers($filter: ModelSubscriptionFollowersFilterInput) {
        onUpdateFollowers(filter: $filter) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFollowers">>
    >;
  }

  OnDeleteFollowersListener(
    filter?: ModelSubscriptionFollowersFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFollowers">>
  > {
    const statement = `subscription OnDeleteFollowers($filter: ModelSubscriptionFollowersFilterInput) {
        onDeleteFollowers(filter: $filter) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFollowers">>
    >;
  }

  OnCreateFollowingListener(
    filter?: ModelSubscriptionFollowingFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFollowing">>
  > {
    const statement = `subscription OnCreateFollowing($filter: ModelSubscriptionFollowingFilterInput) {
        onCreateFollowing(filter: $filter) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFollowing">>
    >;
  }

  OnUpdateFollowingListener(
    filter?: ModelSubscriptionFollowingFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFollowing">>
  > {
    const statement = `subscription OnUpdateFollowing($filter: ModelSubscriptionFollowingFilterInput) {
        onUpdateFollowing(filter: $filter) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFollowing">>
    >;
  }

  OnDeleteFollowingListener(
    filter?: ModelSubscriptionFollowingFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFollowing">>
  > {
    const statement = `subscription OnDeleteFollowing($filter: ModelSubscriptionFollowingFilterInput) {
        onDeleteFollowing(filter: $filter) {
          __typename
          id
          friendsID
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFollowing">>
    >;
  }

  OnCreateFriendsListener(
    filter?: ModelSubscriptionFriendsFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFriends">>
  > {
    const statement = `subscription OnCreateFriends($filter: ModelSubscriptionFriendsFilterInput) {
        onCreateFriends(filter: $filter) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFriends">>
    >;
  }

  OnUpdateFriendsListener(
    filter?: ModelSubscriptionFriendsFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFriends">>
  > {
    const statement = `subscription OnUpdateFriends($filter: ModelSubscriptionFriendsFilterInput) {
        onUpdateFriends(filter: $filter) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFriends">>
    >;
  }

  OnDeleteFriendsListener(
    filter?: ModelSubscriptionFriendsFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFriends">>
  > {
    const statement = `subscription OnDeleteFriends($filter: ModelSubscriptionFriendsFilterInput) {
        onDeleteFriends(filter: $filter) {
          __typename
          id
          Followings {
            __typename
            nextToken
          }
          Followers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFriends">>
    >;
  }

  OnCreateChatroomListener(
    filter?: ModelSubscriptionChatroomFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateChatroom">>
  > {
    const statement = `subscription OnCreateChatroom($filter: ModelSubscriptionChatroomFilterInput) {
        onCreateChatroom(filter: $filter) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
            userID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          chatroomLastMessageId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateChatroom">>
    >;
  }

  OnUpdateChatroomListener(
    filter?: ModelSubscriptionChatroomFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateChatroom">>
  > {
    const statement = `subscription OnUpdateChatroom($filter: ModelSubscriptionChatroomFilterInput) {
        onUpdateChatroom(filter: $filter) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
            userID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          chatroomLastMessageId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateChatroom">>
    >;
  }

  OnDeleteChatroomListener(
    filter?: ModelSubscriptionChatroomFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteChatroom">>
  > {
    const statement = `subscription OnDeleteChatroom($filter: ModelSubscriptionChatroomFilterInput) {
        onDeleteChatroom(filter: $filter) {
          __typename
          id
          Messages {
            __typename
            nextToken
          }
          users {
            __typename
            nextToken
          }
          LastMessage {
            __typename
            id
            text
            chatroomID
            images
            userID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          chatroomLastMessageId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteChatroom">>
    >;
  }

  OnCreateMessageListener(
    filter?: ModelSubscriptionMessageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMessage">>
  > {
    const statement = `subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
        onCreateMessage(filter: $filter) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMessage">>
    >;
  }

  OnUpdateMessageListener(
    filter?: ModelSubscriptionMessageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMessage">>
  > {
    const statement = `subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
        onUpdateMessage(filter: $filter) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMessage">>
    >;
  }

  OnDeleteMessageListener(
    filter?: ModelSubscriptionMessageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMessage">>
  > {
    const statement = `subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
        onDeleteMessage(filter: $filter) {
          __typename
          id
          text
          chatroomID
          images
          userID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMessage">>
    >;
  }

  OnCreateUserListener(
    filter?: ModelSubscriptionUserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  > {
    const statement = `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
        onCreateUser(filter: $filter) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
    >;
  }

  OnUpdateUserListener(
    filter?: ModelSubscriptionUserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  > {
    const statement = `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
        onUpdateUser(filter: $filter) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
    >;
  }

  OnDeleteUserListener(
    filter?: ModelSubscriptionUserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  > {
    const statement = `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
        onDeleteUser(filter: $filter) {
          __typename
          id
          name
          userid
          status
          Messages {
            __typename
            nextToken
          }
          Chatrooms {
            __typename
            nextToken
          }
          Posts {
            __typename
            nextToken
          }
          profilepicture
          Comments {
            __typename
            nextToken
          }
          cover
          Friends {
            __typename
            id
            createdAt
            updatedAt
          }
          Imagesusers {
            __typename
            nextToken
          }
          notificationsseen
          messagesseen
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
          userFriendsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
    >;
  }

  OnCreateCommentListener(
    filter?: ModelSubscriptionCommentFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateComment">>
  > {
    const statement = `subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
        onCreateComment(filter: $filter) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateComment">>
    >;
  }

  OnUpdateCommentListener(
    filter?: ModelSubscriptionCommentFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateComment">>
  > {
    const statement = `subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
        onUpdateComment(filter: $filter) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateComment">>
    >;
  }

  OnDeleteCommentListener(
    filter?: ModelSubscriptionCommentFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteComment">>
  > {
    const statement = `subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
        onDeleteComment(filter: $filter) {
          __typename
          id
          text
          postID
          userID
          images
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteComment">>
    >;
  }

  OnCreatePostListener(
    filter?: ModelSubscriptionPostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePost">>
  > {
    const statement = `subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
        onCreatePost(filter: $filter) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePost">>
    >;
  }

  OnUpdatePostListener(
    filter?: ModelSubscriptionPostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePost">>
  > {
    const statement = `subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
        onUpdatePost(filter: $filter) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePost">>
    >;
  }

  OnDeletePostListener(
    filter?: ModelSubscriptionPostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePost">>
  > {
    const statement = `subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
        onDeletePost(filter: $filter) {
          __typename
          id
          text
          Comments {
            __typename
            nextToken
          }
          userid
          users {
            __typename
            nextToken
          }
          images
          Likeposts {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePost">>
    >;
  }

  OnCreateUserChatroomListener(
    filter?: ModelSubscriptionUserChatroomFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUserChatroom">>
  > {
    const statement = `subscription OnCreateUserChatroom($filter: ModelSubscriptionUserChatroomFilterInput) {
        onCreateUserChatroom(filter: $filter) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onCreateUserChatroom">
      >
    >;
  }

  OnUpdateUserChatroomListener(
    filter?: ModelSubscriptionUserChatroomFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUserChatroom">>
  > {
    const statement = `subscription OnUpdateUserChatroom($filter: ModelSubscriptionUserChatroomFilterInput) {
        onUpdateUserChatroom(filter: $filter) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onUpdateUserChatroom">
      >
    >;
  }

  OnDeleteUserChatroomListener(
    filter?: ModelSubscriptionUserChatroomFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUserChatroom">>
  > {
    const statement = `subscription OnDeleteUserChatroom($filter: ModelSubscriptionUserChatroomFilterInput) {
        onDeleteUserChatroom(filter: $filter) {
          __typename
          id
          chatroomId
          userId
          chatroom {
            __typename
            id
            createdAt
            updatedAt
            chatroomLastMessageId
          }
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onDeleteUserChatroom">
      >
    >;
  }

  OnCreateUserPostListener(
    filter?: ModelSubscriptionUserPostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUserPost">>
  > {
    const statement = `subscription OnCreateUserPost($filter: ModelSubscriptionUserPostFilterInput) {
        onCreateUserPost(filter: $filter) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUserPost">>
    >;
  }

  OnUpdateUserPostListener(
    filter?: ModelSubscriptionUserPostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUserPost">>
  > {
    const statement = `subscription OnUpdateUserPost($filter: ModelSubscriptionUserPostFilterInput) {
        onUpdateUserPost(filter: $filter) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUserPost">>
    >;
  }

  OnDeleteUserPostListener(
    filter?: ModelSubscriptionUserPostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUserPost">>
  > {
    const statement = `subscription OnDeleteUserPost($filter: ModelSubscriptionUserPostFilterInput) {
        onDeleteUserPost(filter: $filter) {
          __typename
          id
          userId
          postId
          user {
            __typename
            id
            name
            userid
            status
            profilepicture
            cover
            notificationsseen
            messagesseen
            createdAt
            updatedAt
            userFriendsId
          }
          post {
            __typename
            id
            text
            userid
            images
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUserPost">>
    >;
  }
}
