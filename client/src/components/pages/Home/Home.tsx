import "./App.css";
import { Chat } from "../../Chat/Chat";
import { Sidebar } from "../../Sidebar/Sidebar";
import { useState } from "react";

export function Home() {
  const [selectedChannelId, setSelectedChannelId] = useState<string>(
    "65e4afeffe0afb859f0ca203"
  );
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  //TODO do animation with vanishment effect for the chat
  function handleSideBar() {
    setIsOpenSideBar((e) => {
      return !e;
    });
  }
  function handleClickChannel(channelId: string | undefined) {
    if (channelId) {
      setSelectedChannelId(channelId);
      setIsOpenSideBar(false);
    }
  }
  return (
    <>
      <div className="Channels">
        {isOpenSideBar && (
          <Sidebar
            setSelectedChannelId={setSelectedChannelId}
            handleClickChannel={handleClickChannel}
          />
        )}
        {selectedChannelId && !isOpenSideBar && (
          <Chat
            selectedChannelId={selectedChannelId}
            handleSideBar={handleSideBar}
          />
        )}
      </div>
    </>
  );
}
