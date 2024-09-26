import { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./index.css";
import InputBar from "../InputBar/InputBar";
import { useQuery } from "@apollo/client";
import Arrow from "../../assets/double-left-50.png";
import { GET_MESSAGES_FOR_CHANNEL } from "../../query";
import { MessageType } from "../../types";
import { useLocation } from "react-router-dom";
// get all messages

export default function Messages({
  selectedChannelId,
  handleSideBar,
}: {
  selectedChannelId: string;
  handleSideBar: MouseEventHandler<HTMLElement>;
}) {
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);

  const bottomEl = useRef<null | HTMLDivElement>(null);
  const location = useLocation();
  const userPage = location.state.user;
  const { loading, data, error } = useQuery(
    GET_MESSAGES_FOR_CHANNEL({ channelId: selectedChannelId }),
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
    if (data) {
      /* chatUserItemsVar(data.Users); */
      setChatMessages(data.ChannelMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.ChannelMessages)]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(scrollToBottom, [JSON.stringify(chatMessages)]);

  return (
    <>
      {/* TODO  do loading screen*/}
      {loading && <div>loading</div>}
      {error && <div>{error.message}</div>}

      <div className="container">
        <header className="topBar">
          <img src={Arrow} alt="fireSpot" onClick={handleSideBar} />
        </header>
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
      <InputBar
        selectedChannelId={selectedChannelId}
        setChatMessages={setChatMessages}
      />
    </>
  );
}
