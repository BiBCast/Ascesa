import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import "./index.css";
import { io } from "socket.io-client";
import { ChatUser } from "../../App";
import SendImg from "./../../assets/send-button.png";
const socket = io("http://localhost:3000/");
export default function InputBar({
  setChatUsers,
}: {
  setChatUsers: Dispatch<SetStateAction<ChatUser[]>>;
}) {
  const [input, setInput] = useState("");

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    console.log(e);

    if (e.key === "Enter") {
      if (input === "") return;
      //TODO implement user
      setChatUsers((prev) => {
        console.log(prev);
        return [...prev, { user: "pietro", message: input }];
      });

      socket.emit("chat message", "pietro;" + input);
      setInput("");
    }
  }
  function handleInputSendbutton() {
    if (input === "") return;
    //TODO implement user
    setChatUsers((prev) => {
      console.log(prev);

      return [...prev, { user: "pietro", message: input }];
    });

    socket.emit("chat message", "pietro;" + input);
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
