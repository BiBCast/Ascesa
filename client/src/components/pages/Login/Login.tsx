import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
export function Login() {
  const location = useLocation();
  const [user, setInput] = useState(location.state ? location.state : "");

  return (
    <div className="container-login">
      <div className="title">Ascesa </div>
      <input
        type="text"
        onChange={(e) => setInput(e.currentTarget.value)}
        value={user}
        placeholder="User name"
      />
      {user.trim() && (
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
