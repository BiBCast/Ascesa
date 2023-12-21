import "./App.css";
import { Chat } from "./components/Chat/Chat";
import InputBar from "./components/Messages/InputBar/InputBar";
import Messages from "./components/Messages/Messages";
//like if we where on a
//TODO Implement fetch api backend (get all)

/* import axios from "axios";
import { useQuery } from "react-query";

const endpoint = "http://localhost:3000/graphql/";
const FILMS_QUERY = `
  {
    Users{
      user,
      message
    }
  }
`; */

type ChatUser = {
  user: string;
  message: string;
};
//const [ChatUser, SetChatUser] = useState<ChatUser[]>();
function App() {
  /* const { data, isLoading, error } = useQuery("launches", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: FILMS_QUERY,
      },
    });
    return response.data.data;
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>; */

  return (
    <>
      {/*  <ul>
        {data.map((_index: string, launch: ChatUser) => (
          <li key={_index}>{launch.message}</li>
        ))}
      </ul> */}
      <Chat>
        <Messages>
          <InputBar />
        </Messages>
      </Chat>
    </>
  );
}

{
  /* <Message messageAndUsersJson={}/>
<InputBar lasttypedTextAppendedNotSend={}/> */
}

export default App;
