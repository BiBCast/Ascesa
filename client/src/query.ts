import { gql } from "@apollo/client";

export const GET_MESSAGES_FOR_CHANNEL = ({
  channelId,
  getLastMessage = false,
}: {
  channelId: string;
  getLastMessage?: boolean;
}) => {
  return gql`
    query GetMessages {
      ChannelMessages(channel_id: "${channelId}", getLastMessage: ${getLastMessage}) {
        content
        user_id {
          user
        }
      }
    }
  `;
};

export const GET_ALL_CHANNEL = gql`
  query GetChannels {
    Channels {
      title
      id
    }
  }
`;

export const GET_CHANNEL = (channelId: string) => {
  return gql`
    query GetChannel {
      Channel(id: "${channelId}") {
        title
      }
    }
  `;
};
