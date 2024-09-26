import { useQuery } from "@apollo/client";
import "./index.css";
import { useEffect, useState } from "react";
import { GET_MESSAGES_FOR_CHANNEL } from "../../query";
import { MessageType } from "../../types";

export default function LastMessages({ channelId }: { channelId: string }) {
  const [LastMessage, setLastMessage] = useState<string>("");
  const [LastMessageUser, setLastMessageUser] = useState<string>("");
  const { loading, data, error } = useQuery(
    GET_MESSAGES_FOR_CHANNEL({ channelId: channelId, getLastMessage: true }),
    {
      //TODO to optimize the fetching
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (data) {
      const message = data.ChannelMessages[0] as MessageType;
      setLastMessage(message.content);
      setLastMessageUser(message.user_id.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.ChannelMessages)]);
  //TODO chach last message
  return (
    <div className="last-message">
      {loading && <div>loading</div>}
      {error && <div>{error.message}</div>}

      <div className="message-sender">
        <p>{LastMessageUser}</p>
      </div>
      <div className="message-content">
        <p>{LastMessage}</p>
      </div>
    </div>
  );
}
