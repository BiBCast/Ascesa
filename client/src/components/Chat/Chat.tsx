import { ReactNode } from "react";
import "./index.css";
export function Chat({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="Chat">{children}</section>
    </>
  );
}

//structure components
{
  /* <Channels>
    <Channel>
      <Chat>
        <Header />
        <Messages > 
          <InputBar />
        </Messages>
      </Chat>
    </Channel>
  </Channels>;
   */
}
