import { useEffect, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat/Chat";
import Messages from "./components/Messages/Messages";
import axios from "axios";
import { useQuery } from "react-query";
// TODO  use apollo client
const endpoint = "http://localhost:3000/graphql/";
const FETCHALLQUERY = `
  {
    Users{
      user,
      message
    }
  }
`;

export type ChatUser = {
  user: string;
  message: string;
};

function App() {
  const [ChatUsers, setChatUsers] = useState<ChatUser[]>([]);
  //fetch data from api
  const {
    data,
    isLoading,
    error,
  }: { data: ChatUser[]; isLoading: boolean; error: unknown } = useQuery(
    "launches",
    async () => {
      const response = await axios({
        url: endpoint,
        method: "POST",
        data: {
          query: FETCHALLQUERY,
        },
      });

      return response.data.data.Users; // Assuming the data structure is like { data: { Users: [...] } }
    }
  );

  useEffect(() => {
    setChatUsers(data);
    console.log("refresh");
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);
  //data is an array

  return (
    <>
      <div className="Channels">
        {isLoading && "Loading..."}
        {/* FIXME Display error */}
        {error && <pre>{error.message}</pre>}

        {ChatUsers?.map((user: ChatUser, index: number) => (
          <ul key={index}>
            <li>{user.user}</li>
            <li>{user.message}</li>
          </ul>
        ))}

        {/* TODO XXX we are inside a channel channels have child a channel , app collect the number of servers and qith maps create a dynamic structure , each structure (channel)have the nesting below   */}
        {/* 2 possibility : YYY channels and chat are on the same level and , we do the fetch of the channels/ChatUserMessage  at the same level, we detect what channel is selected and pass the event to the same level of teh other before mentioned   */}
        {/* we can pass a function to detect the selected channel created in the level of the  channels*/}
        {/* implement in the future a context manager like redux */}
        <Chat>
          {/* TODO pass all messages and user to the Messages component  */}
          <Messages ChatUsers={ChatUsers} />
        </Chat>
      </div>
    </>
  );
}

export default App;
