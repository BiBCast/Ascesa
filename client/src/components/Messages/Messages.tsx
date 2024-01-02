import { ChatUser } from "../../App";
import "./index.css";
import InputBar from "./InputBar/InputBar";
export default function Messages({ ChatUsers }: { ChatUsers: ChatUser[] }) {
  return (
    <>
      <div className="Messages">
        {ChatUsers?.map((user: ChatUser, index: number) => (
          <ul key={index}>
            <li>User: {user.user}</li>
            <li>Message: {user.message}</li>
          </ul>
        ))}
      </div>
      <InputBar />
    </>
  );
}
