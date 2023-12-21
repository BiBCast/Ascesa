import { ReactNode } from "react";

export default function Messages({ children }: { children: ReactNode }) {
  return (
    <div>
      Message
      <br></br>
      {children}
    </div>
  );
}
