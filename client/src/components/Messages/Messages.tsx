import { ReactNode } from "react";

export default function Messages({ children }: { children: ReactNode }) {
  return (
    <>
      <div>Messages</div>
      {children}
    </>
  );
}
