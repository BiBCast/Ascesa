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
