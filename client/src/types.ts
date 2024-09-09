export type MessageType = {
  id?: string;
  user_id: {
    user: string;
  };
  content: string;
  channel_id: string;
};

export type ChannelType = {
  id: string;
  title: string;
};

export type UserType = {
  id?: string;
  user: string;
  password: string;
  messages: string;
  channel_ids: string;
};
