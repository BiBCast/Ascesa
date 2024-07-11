/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type RootqueryType = {
  __typename?: 'RootqueryType';
  Channel?: Maybe<ChannelType>;
  ChannelMessages?: Maybe<Array<Maybe<MessageType>>>;
  Channels?: Maybe<Array<Maybe<ChannelType>>>;
  User?: Maybe<UserType>;
  Users?: Maybe<Array<Maybe<UserType>>>;
};


export type RootqueryTypeChannelArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type RootqueryTypeChannelMessagesArgs = {
  channel_id?: InputMaybe<Scalars['ID']['input']>;
  getLastMessage?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RootqueryTypeUserArgs = {
  user?: InputMaybe<Scalars['String']['input']>;
};

export type ChannelType = {
  __typename?: 'channelType';
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<Maybe<UserType>>>;
};

export type MessageType = {
  __typename?: 'messageType';
  channel_id?: Maybe<ChannelType>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  user_id?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'userType';
  channel_ids?: Maybe<Array<Maybe<ChannelType>>>;
  id?: Maybe<Scalars['ID']['output']>;
  messages?: Maybe<Array<Maybe<MessageType>>>;
  user?: Maybe<Scalars['String']['output']>;
};

export type GetMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesQuery = { __typename?: 'RootqueryType', ChannelMessages?: Array<{ __typename?: 'messageType', content?: string | null, user_id?: { __typename?: 'userType', user?: string | null } | null } | null> | null };

export type GetChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsQuery = { __typename?: 'RootqueryType', Channels?: Array<{ __typename?: 'channelType', title?: string | null, id?: string | null } | null> | null };

export type GetChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelQuery = { __typename?: 'RootqueryType', Channel?: { __typename?: 'channelType', title?: string | null } | null };


export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChannelMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channel_id"},"value":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Channel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetChannelQuery, GetChannelQueryVariables>;