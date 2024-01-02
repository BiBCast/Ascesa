import { Dispatch, KeyboardEvent, useState } from "react";
import "./index.css";
import { io } from "socket.io-client";
import { ChatUser } from "../../App";
const socket = io("http://localhost:3000/");
export default function InputBar({
  setChatUsers,
}: {
  setChatUsers: Dispatch<ChatUser[]>;
}) {
  const [input, setInput] = useState("");
  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (input === "") return;
      console.log(input);
      //TODO implement user
      setChatUsers((prev: ChatUser[]) => {
        [...prev, { user: "pietro", message: input } as ChatUser];
      });
      socket.emit("chat message", "pietro;" + input);
    }
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
      <div>invia</div>
    </div>
  );
}
