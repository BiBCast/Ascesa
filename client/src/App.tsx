import { useEffect, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat/Chat";
import InputBar from "./components/Messages/InputBar/InputBar";
import Messages from "./components/Messages/Messages";

import axios from "axios";
import { useQuery } from "react-query";

const endpoint = "http://localhost:3000/graphql/";
const FETCHALLQUERY = `
  {
    Users{
      user,
      message
    }
  }
`;

type ChatUser = {
  user: string;
  message: string;
};

function App() {
  const [ChatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const { data, isLoading, error } = useQuery("launches", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: FETCHALLQUERY,
      },
    });

    return response.data.data.Users; // Assuming the data structure is like { data: { Users: [...] } }
  });

  useEffect(() => {
    setChatUsers(data);
    console.log("refresh");
    console.log(data);
  }, [data]);
  //data is an array

  return (
    <>
      {isLoading && "Loading..."}
      {error && <pre>{error.message}</pre>}
      <ul>
        {ChatUsers?.map((user: ChatUser, index: number) => (
          <li key={index}>{user.message}</li>
        ))}
      </ul>
      <Chat>
        <Messages>
          <InputBar />
        </Messages>
      </Chat>
    </>
  );
}

export default App;
