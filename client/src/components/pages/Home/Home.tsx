import "./App.css";
import { Chat } from "../../Chat/Chat";
import { Sidebar } from "../../Sidebar/Sidebar";
import { useState } from "react";

export function Home({UserId}:{UserId:string}) {
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);

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
            UserId={UserId}
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
