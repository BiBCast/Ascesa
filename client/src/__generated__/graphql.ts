/* eslint-disable */
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
  user_id?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'userType';
  channel_ids?: Maybe<Array<Maybe<ChannelType>>>;
  id?: Maybe<Scalars['ID']['output']>;
  messages?: Maybe<Array<Maybe<MessageType>>>;
  user?: Maybe<Scalars['String']['output']>;
};
