import "./index.css";

export function CreateChannel() {
  return (
    <div className="create-channel">
      <input placeholder="channel name"></input>
      <input placeholder="utenti nel canale"></input>
      <button>create</button>
    </div>
  );
}
