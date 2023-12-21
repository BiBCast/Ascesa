import "./App.css";
import { Chat } from "./components/Chat/Chat";
import InputBar from "./components/Messages/InputBar/InputBar";
import Messages from "./components/Messages/Messages";

function App() {
  return (
    <>
      <Chat>
        <Messages>
          <InputBar />
        </Messages>
      </Chat>
    </>
  );
}

export default App;
