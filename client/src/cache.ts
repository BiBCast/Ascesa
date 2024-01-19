import { InMemoryCache, gql, makeVar } from "@apollo/client";
import { ChatUser } from "./components/pages/Home/Home";

export const GET_CHAT_USERS = gql`
  query GetChatUserItems {
    chatUserItems @client
  }
`;
export const chatUserItemsVar = makeVar<ChatUser[]>([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        chatUserItems: {
          read() {
            return chatUserItemsVar();
          },
        },
      },
    },
  },
});
