import { ReactNode } from "react";

export function Chat({ children }: { children: ReactNode }) {
  return (
    <>
      <section>{children}</section>
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
