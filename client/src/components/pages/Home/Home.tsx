import "./App.css";
import { Chat } from "../../Chat/Chat";
import { Sidebar } from "../../Sidebar/Sidebar";
import { useState } from "react";

// TODO Channel? pubblicare?

export function Home() {
  const [selectedChannelId, setSelectedChannelId] = useState<string>("f");
  return (
    <>
      <div className="Channels">
        <Sidebar setSelectedChannelId={setSelectedChannelId}/>
        {selectedChannelId && <Chat selectedChannelId={selectedChannelId} />}
        {/*  <Chat /> */}
      </div>
    </>
  );
}
