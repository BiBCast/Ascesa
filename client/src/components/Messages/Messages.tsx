import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { ChatUser } from "../pages/Home/Home";
import "./index.css";
import InputBar from "../InputBar/InputBar";
export default function Messages({
  ChatUser,
  setChatUsers,
}: {
  ChatUser: ChatUser[];
  setChatUsers: Dispatch<SetStateAction<ChatUser[]>>;
}) {
  const bottomEl = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [ChatUser?.length]);
  return (
    <>
      <div className="container">
        {ChatUser?.map((user: ChatUser, index: number) => (
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
      <InputBar setChatUsers={setChatUsers} />
    </>
  );
}
