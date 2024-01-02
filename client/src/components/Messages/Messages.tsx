import { ReactNode } from "react";
import "./index.css";
export default function Messages({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="Messages">
        <p>text</p>
      </div>
      {children}
    </>
  );
}
