import { Dispatch, SetStateAction } from "react";
import "./index.css";
import Messages from "../Messages/Messages";
import { ChatUser } from "../pages/Home/Home";
export function Chat({
  ChatUser,
  setChatUsers,
}: {
  ChatUser: ChatUser[];
  setChatUsers: Dispatch<SetStateAction<ChatUser[]>>;
}) {
  return (
    <>
      <section className="Chat">
        <Messages ChatUser={ChatUser} setChatUsers={setChatUsers} />
      </section>
    </>
  );
}

//structure components
{
  /* <Channels>
    <Channel>
      <Chat>
        <Header />
        <Messages > 
          <InputBar />
        </Messages>
      </Chat>
    </Channel>
  </Channels>;
   */
}
