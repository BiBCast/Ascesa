import "./index.css";
import Messages from "../Messages/Messages";
export function Chat({ selectedChannelId }: { selectedChannelId: string }) {
  return (
    <>
      <section className="Chat">
        <Messages selectedChannelId={selectedChannelId} />
      </section>
    </>
  );
}
