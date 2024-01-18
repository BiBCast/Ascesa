import { useEffect, useState } from "react";
import "./App.css";
import { Chat } from "../../Chat/Chat";
import { Link, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

// TODO Use redux or similars
// FIXME on start up apollo give me wrong data

const GET_USERS = gql`
  query GetUsers {
    Users {
      user
      message
    }
  }
`;

export type ChatUser = {
  user: string;
  message: string;
};

export function Home() {
  const location = useLocation();

  const [ChatUsers, setChatUsers] = useState<ChatUser[]>([]);

  const { loading, data, error } = useQuery(GET_USERS);

  useEffect(() => {
    console.log("prev chatusers " + ChatUsers);
    console.log(data?.Users);

    if (data) {
      setChatUsers(data.Users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.Users)]);

  return (
    <>
      <div className="Channels">
        {loading && "Loading..."}
        {error && (
          <div>
            <pre>{error.message}</pre>
          </div>
        )}
        {data && (
          <div>
            <p>data collected</p>
          </div>
        )}
        <div>User: {location.state}</div>
        <div>
          <Link
            to={{
              pathname: "/",
            }}
          >
            Login
          </Link>
        </div>
        {/*   we are inside a channel channels have child a channel , app collect the number of servers and qith maps create a dynamic structure , each structure (channel)have the nesting below   */}
        {/* 2 possibility : YYY channels and chat are on the same level and , we do the fetch of the channels/ChatUserMessage  at the same level, we detect what channel is selected and pass the event to the same level of teh other before mentioned   */}
        {/* we can pass a function to detect the selected channel created in the level of the  channels*/}
        {/* implement in the future a context manager like redux */}
        <Chat ChatUser={ChatUsers} setChatUsers={setChatUsers} />
        {/*  pass all messages and user to the Messages component  */}
      </div>
    </>
  );
}
