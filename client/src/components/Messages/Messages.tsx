import { useEffect, useRef, useState } from "react";
import "./index.css";
import InputBar from "../InputBar/InputBar";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_MESSAGES_FOR_CHANNEL } from "../../query";
import { MessageType } from "../../types";
// get all messages

export default function Messages({
  selectedChannelId,
}: {
  selectedChannelId: string;
}) {
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const location = useLocation();
  const userPage = location.state;
  const bottomEl = useRef<null | HTMLDivElement>(null);
  const { loading, data, error } = useQuery(
    GET_MESSAGES_FOR_CHANNEL(selectedChannelId),
    {
      //TODO to optimize the fetching
      fetchPolicy: "no-cache",
    }
  );
  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView();
  };
  //TODO type for data

  useEffect(() => {
    console.log(GET_MESSAGES_FOR_CHANNEL(selectedChannelId));

    if (data) {
      /* chatUserItemsVar(data.Users); */
      setChatMessages(data.ChannelMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.ChannelMessages)]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(scrollToBottom, [JSON.stringify(chatMessages)]);
  if (chatMessages) {
    console.log(chatMessages);
  }
  return (
    <>
      {loading && <div>{loading}</div>}
      {error && <div>{error.message}</div>}
      {data && <div>data collected </div>}
      <div>User : {userPage}</div>
      <Link
        to={{
          pathname: "/",
        }}
        state={userPage}
      >
        Login
      </Link>
      <div className="container">
        {chatMessages?.map(
          ({ content, user_id }: MessageType, index: number) => (
            <div
              className={
                userPage !== user_id.user ? "chatboxReceived" : "chatboxSent"
              }
              key={index}
            >
              <div className="baloon">
                <div>
                  <p className="user">{user_id.user}</p>
                </div>
                <div>
                  <p className="message">{content}</p>
                </div>
              </div>
            </div>
          )
        )}
        <div ref={bottomEl}></div>
      </div>
      <InputBar selectedChannelId={selectedChannelId} setChatMessages={setChatMessages} />
    </>
  );
}
