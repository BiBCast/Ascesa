import { Dispatch, KeyboardEvent, KeyboardEventHandler, useState } from "react";
import "./index.css";
export default function Input({
  setMethod,
  value,
  type,
  placeholder,
  onKeyDown = () => {},
}: {
  setMethod: Dispatch<string>;
  value: string;
  type: string;
  placeholder: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-cp" onKeyDown={onKeyDown}>
      <input
        type={showPassword ? "text" : type}
        onChange={(e) => setMethod(e.currentTarget.value)}
        value={value}
        placeholder={placeholder}
      />
      {type === "password" && (
        <input
          id="check"
          type="checkbox"
          value={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
      )}
    </div>
  );
}
