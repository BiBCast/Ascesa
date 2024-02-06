import "./index.css";
export function SelectableChannel() {
    /* state received from the father that indicate the id 
    than pass the id to te message where he get all messages
    */
  function handleClick() {
    console.log("load chat data");
  }
  return (
    <a className="selectable_channel" tabIndex={0} onClick={handleClick}>
      <div className="image">Image</div>
      <div className="container">
        <div className="title">
          <p>Title</p>
        </div>
        <div className="message">
          <p>Last message</p>
        </div>
      </div>
    </a>
  );
}
