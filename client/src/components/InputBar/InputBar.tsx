import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./index.css";
import { io } from "socket.io-client";
import { ChatUser } from "../pages/Home/Home";
import SendImg from "./../../assets/send-button.png";
import { useLocation } from "react-router-dom";
import { chatUserItemsVar } from "../../cache";
import useAutosizeTextArea from "../../useAutoSizeTextArea";
const socket = io("http://localhost:3000/");

export default function InputBar() {
  const [receivedMsg, setReceivedMsg] = useState<ChatUser>();
  const [input, setInput] = useState("");
  const location = useLocation();
  const user = location.state;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, input);

  socket.on("chat message", async (chatUser: ChatUser) => {
    setReceivedMsg(chatUser);
  });

  /* we send a request of added message to the backend , the back end send to every one the updated message , so we dont have to worry about the update of the chat because every chat is updated at the same time  */
  useEffect(() => {
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

    chatUserItemsVar([...chatUserItemsVar(), receivedMsg]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMsg]);

  function handleInput(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Enter") return;
    if (e.ctrlKey && e.key === "Enter") {
      setInput((e) => e + "\n");
      return;
    }
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
      <textarea
        onChange={(e) => setInput(e.currentTarget.value)}
        value={input}
        placeholder="Ctrl + Enter new line"
        onKeyDown={handleInput}
        ref={textAreaRef}
        rows={1}
      />

      <div className="send">
        <img src={SendImg} alt="fireSpot" onClick={handleInputSendbutton} />
      </div>
    </div>
  );
}
