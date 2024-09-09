import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
export function Login() {
  const location = useLocation();
  const [user, setInput] = useState(location.state ? location.state : "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-login">
      <div className="title">Ascesa </div>
      <input
        type="text"
        onChange={(e) => setInput(e.currentTarget.value)}
        value={user}
        placeholder="User name"
      />
      <input
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.currentTarget.value)}
        value={password}
        placeholder="Password"
      />
      <input
        id="check"
        type="checkbox"
        value={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
      />
      {user.trim() && password.trim() && (
        <Link
          className="button"
          to={{
            pathname: "/home",
          }}
          state={user}
        >
          Go to chat
        </Link>
      )}
    </div>
  );
}
