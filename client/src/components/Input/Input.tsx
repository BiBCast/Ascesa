import { Dispatch, useState } from "react";
import "./index.css";
export default function Input({
  setMethod,
  value,
  type,
  placeholder,
}: {
  setMethod: Dispatch<string>;
  value: string;
  type: string;
  placeholder: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-cp">
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
