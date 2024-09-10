import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import Input from "../../Input/Input";
export function Login() {
  const location = useLocation();
  const [user, setInput] = useState(location.state ? location.state : "");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="ct-login">
        <div className="title">
          <p>Ascesa</p>
        </div>
        <Input
          placeholder="User name"
          setMethod={setInput}
          type="text"
          value={user}
        />

        <Input
          placeholder="Password"
          setMethod={setPassword}
          type="password"
          value={password}
        />

        {user.trim() && password.trim() && (
          <Link
            className="button"
            to={{
              pathname: "/home",
            }}
            state={{ user: user, password: password }}
          >
            Go to chat
          </Link>
        )}
      </div>
    </div>
  );
}
