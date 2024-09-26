import { KeyboardEventHandler, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import Input from "../../Input/Input";
export function Login() {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation
  const [user, setInput] = useState(location.state ? location.state : "");
  const [password, setPassword] = useState("");

  function handleInput(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Enter") return;
    console.log(e);
    navigate("/home", { state: { user: user, password: password } });
  }

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
          onKeyDown={handleInput}
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
