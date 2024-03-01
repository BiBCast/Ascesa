//not utilizzated

import { InMemoryCache, makeVar } from "@apollo/client";
import { MessageType } from "./types";

export const chatUserItemsVar = makeVar<MessageType[]>([]);

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
export { MessageType };

