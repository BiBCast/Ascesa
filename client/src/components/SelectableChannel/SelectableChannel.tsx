import { Dispatch } from "react";
import "./index.css";
export function SelectableChannel({
  title,
  channelId,
  setSelectedChannelId,
}: {
  title: string;
  channelId: string | undefined;
  setSelectedChannelId: Dispatch<string>;
}) {
  /* state received from the father that indicate the id 
    than pass the id to te message where he get all messages
    */
  function handleClick() {
    if (channelId) setSelectedChannelId(channelId);
  }
  return (
    <a className="selectable_channel" tabIndex={0} onClick={handleClick}>
      <div className="image">Image</div>
      <div>id = {channelId}</div>
      <div className="container">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="message">
          <p>Last message</p>
        </div>
      </div>
    </a>
  );
}
