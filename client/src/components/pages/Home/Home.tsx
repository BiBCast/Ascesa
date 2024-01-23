import "./App.css";
import { Chat } from "../../Chat/Chat";

// TODO Channel? pubblicare?

export function Home() {
  return (
    <>
      <div className="Channels">
        <div></div>
        <Chat />
      </div>
    </>
  );
}
