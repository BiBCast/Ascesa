import { useEffect, useRef, useState } from "react";
import "./index.css";
import InputBar from "../InputBar/InputBar";
import { ChatUser } from "../../cache";
import { Link, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";


// get all messages 
const GET_USERS = gql`
  query GetUsers {
    Users {
      user
      message
    }
  }
`;

export default function Messages() {
  const location = useLocation();
  const [chatMessages, setChatMessages] = useState<ChatUser[]>([]);
  // i don't know why i should put it here but it works
  /* const chatUser = useReactiveVar(chatUserItemsVar); */
  const userPage = location.state;
  const bottomEl = useRef<null | HTMLDivElement>(null);

  const { loading, data, error } = useQuery(GET_USERS, {
    //TODO to optimize the fetching
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data) {
      /* chatUserItemsVar(data.Users); */
      setChatMessages(data.Users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.Users)]);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(scrollToBottom, [JSON.stringify(chatMessages)]);
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
        {chatMessages?.map((user: ChatUser, index: number) => (
          <div
            className={
              userPage !== user.user ? "chatboxReceived" : "chatboxSent"
            }
            key={index}
          >
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
      <InputBar setChatMessages={setChatMessages} />
    </>
  );
}
