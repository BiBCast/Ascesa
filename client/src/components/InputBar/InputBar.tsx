import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
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
  const [input, setInput] = useState("");
  const location = useLocation();

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const user = location.state;
      if (!user && typeof user != "string")
        throw new Error("the state(user) is not valid");
      if (input.trim() === "") return;

      setChatUsers((prev) => {
        return [...prev, { user: user, message: input }];
      });

      socket.emit("chat message", user + ";" + input);
      setInput("");
    }
  }
  function handleInputSendbutton() {
    if (input === "") return;
    const user = location.state;
    if (!user && typeof user != "string")
      throw new Error("the state(user) is not valid");

    setChatUsers((prev) => {
      console.log(prev);

      return [...prev, { user: user, message: input }];
    });

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
