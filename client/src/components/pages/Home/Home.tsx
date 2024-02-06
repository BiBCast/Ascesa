import "./App.css";
import { Chat } from "../../Chat/Chat";
import { Sidebar } from "../../Sidebar/Sidebar";

// TODO Channel? pubblicare?

export function Home() {
  return (
    <>
      <div className="Channels">
        <Sidebar />
        {/* <Chat /> */}
      </div>
    </>
  );
}
