import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./index.css";
import { io } from "socket.io-client";
import SendImg from "./../../assets/send-button.png";
import { useLocation } from "react-router-dom";
import { MessageType } from "../../cache";
import useAutosizeTextArea from "../../useAutoSizeTextArea";
const socket = io("http://localhost:3000/");

export default function InputBar({
  setChatMessages,
}: {
  setChatMessages: Dispatch<SetStateAction<MessageType[]>>;
}) {
  const [receivedMsg, setReceivedMsg] = useState<MessageType>();
  const [input, setInput] = useState("");
  const location = useLocation();
  const user: string = location.state;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, input);

  socket.on("chat message", async (chatUser: MessageType) => {
    setReceivedMsg(chatUser);
  });

  /* we send a request of added message to the backend , the back end send to every one the updated message , so we dont have to worry about the update of the chat because every chat is updated at the same time  */
  useEffect(() => {
    if (!receivedMsg) return;
    const user = receivedMsg.user_id.user;
    const message = receivedMsg.content;

    if (user.trim() === "") {
      console.error("User null");
      return;
    }
    if (message.trim() === "") {
      console.error("message null");
      return;
    }

    /* chatUserItemsVar([...chatUserItemsVar(), receivedMsg]); */
    setChatMessages((prev) => {
      return [...prev, receivedMsg];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMsg]);
  //TODO unite the case
  function handleInput(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Enter") return;

    if (!user && typeof user != "string") {
      console.error("the state(user) is not valid");
      return;
    }
    if (e.ctrlKey && e.key === "Enter") {
      setInput((e) => e + "\n");
      return;
    }
    if (input.trim() === "") return;

    const chatuser: MessageType = {
      user_id: { user: user },
      content: input,
      channel_id: "65d4b1055631b38518d432de",
    };

    socket.emit("chat message", chatuser);

    setInput("");
  }
  function handleInputSendbutton() {
    if (input === "") return;
    if (!user && typeof user != "string") {
      console.error("the state(user) is not valid");
      return;
    }
    const chatuser: MessageType = {
      user_id: { user: user },
      content: input,
      channel_id: "65d4b1055631b38518d432de",
    };

    socket.emit("chat message", chatuser);
    setInput("");
  }

  return (
    <div className="Inputbar">
      <textarea
        onChange={(e) =>
          setInput(
            e.currentTarget.value.trim() === "" ? "" : e.currentTarget.value
          )
        }
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
