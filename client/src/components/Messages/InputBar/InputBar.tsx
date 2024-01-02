import { KeyboardEvent, useState } from "react";
import "./index.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000/");
export default function InputBar() {
  const [input, setInput] = useState("");
  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (input === "") return;
      socket.emit("chat message", input);
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
