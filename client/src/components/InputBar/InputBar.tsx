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
  const [receivedMsg, setReceivedMsg] = useState("");
  socket.on("chat message", async (msg: string) => {
    setReceivedMsg(msg);
  });
  const [input, setInput] = useState("");
  const location = useLocation();
  /* we send a request of added message to the backend , the back end send to every one the updated message , so we dont have to worry about the update of the chat because every chat is updated at the same time  */
  useEffect(() => {
    if (!receivedMsg) return;
    const user = receivedMsg.split(";")[0];
    const message = receivedMsg.split(";")[1];

    if (user.trim() === "") {
      console.error("User null");
      return;
    }
    if (message.trim() === "") {
      console.error("message null");
      return;
    }
    setChatUsers((prev) => {
      return [...prev, { user: user, message: message }];
    });
  }, [receivedMsg]);

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const user = location.state;
    if (!user && typeof user != "string")
      throw new Error("the state(user) is not valid");
    if (input.trim() === "") return;

    socket.emit("chat message", user + ";" + input);
    setInput("");
  }
  function handleInputSendbutton() {
    if (input === "") return;
    const user = location.state;
    if (!user && typeof user != "string")
      throw new Error("the state(user) is not valid");

    socket.emit("chat message", user + ";" + input);
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
