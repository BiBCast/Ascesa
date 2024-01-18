import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./index.css";
import { io } from "socket.io-client";
import { ChatUser } from "../pages/Home/Home";
import SendImg from "./../../assets/send-button.png";
import { useLocation } from "react-router-dom";
const socket = io("http://localhost:3000/");

export default function InputBar({
  setChatUsers,
}: {
  setChatUsers: Dispatch<SetStateAction<ChatUser[]>>;
}) {
  const [receivedMsg, setReceivedMsg] = useState<ChatUser>();
  const [input, setInput] = useState("");
  const location = useLocation();

  socket.on("chat message", async (chatUser: ChatUser) => {
    setReceivedMsg(chatUser);
  });

  /* we send a request of added message to the backend , the back end send to every one the updated message , so we dont have to worry about the update of the chat because every chat is updated at the same time  */
  useEffect(() => {
    console.log("receivedMsg  " + receivedMsg);

    if (!receivedMsg) return;
    const user = receivedMsg.user;
    const message = receivedMsg.message;

    if (user.trim() === "") {
      console.error("User null");
      return;
    }
    if (message.trim() === "") {
      console.error("message null");
      return;
    }
    setChatUsers((prev) => {
      return [...prev, receivedMsg];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMsg]);

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const user = location.state;
    if (!user && typeof user != "string") {
      console.error("the state(user) is not valid");
      return;
    }
    if (input.trim() === "") return;

    socket.emit("chat message", {
      user: user,
      message: input,
    } as ChatUser);
    setInput("");
  }
  function handleInputSendbutton() {
    if (input === "") return;
    const user = location.state;
    if (!user && typeof user != "string") {
      console.error("the state(user) is not valid");
      return;
    }

    socket.emit("chat message", {
      user: user,
      message: input,
    } as ChatUser);
    setInput("");
  }

  return (
    <div className="Inputbar">
      <input
        type="text"
        onChange={(e) => setInput(e.currentTarget.value)}
        value={input}
        placeholder="Canale"
        onKeyDown={handleInput}
      />

      <div className="send">
        <img src={SendImg} alt="fireSpot" onClick={handleInputSendbutton} />
      </div>
    </div>
  );
}
