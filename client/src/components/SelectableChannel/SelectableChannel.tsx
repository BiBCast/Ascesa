import { Dispatch } from "react";
import "./index.css";
import LastMessage from "../LastMessage/LastMessage";
export function SelectableChannel({
  title,
  channelId,
  handleClickChannel,
}: {
  title: string;
  channelId: string;
  setSelectedChannelId: Dispatch<string>;
  handleClickChannel: (channelId: string | undefined) => void;
}) {
  /* state received from the father that indicate the id 
    than pass the id to te message where he get all messages
    */

  return (
    
    <a
      className="selectable_channel"
      tabIndex={0}
      onClick={() => handleClickChannel(channelId)}
    >
      <div className="image">Image</div>

      <div className="container">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="message">
          <div>
            <LastMessage channelId={channelId} />
          </div>
        </div>
      </div>
    </a>
  );
}
