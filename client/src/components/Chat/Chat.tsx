import "./index.css";
import Messages from "../Messages/Messages";
import { MouseEventHandler } from "react";
export function Chat({
  handleSideBar,
  selectedChannelId,
}: {
  handleSideBar: MouseEventHandler<HTMLElement>;
  selectedChannelId: string;
}) {
  return (
    <>
      <section className="Chat">
        <Messages
          selectedChannelId={selectedChannelId}
          handleSideBar={handleSideBar}
        />
      </section>
    </>
  );
}
