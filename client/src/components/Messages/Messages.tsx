import { useEffect, useRef } from "react";
import { ChatUser } from "../pages/Home/Home";
import "./index.css";
import InputBar from "../InputBar/InputBar";
import { chatUserItemsVar } from "../../cache";
export default function Messages() {
  const bottomEl = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(scrollToBottom, [JSON.stringify(chatUserItemsVar())]);
  return (
    <>
      <div className="container">
        {chatUserItemsVar().map((user: ChatUser, index: number) => (
          <div className="chatbox" key={index}>
            <div className="baloon">
              <div>
                <p className="user">{user.user}</p>
              </div>
              <div>
                <p className="message">{user.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomEl}></div>
      </div>
      <InputBar />
    </>
  );
}
