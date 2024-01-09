import { Link, useLocation } from "react-router-dom";

export function Login() {
  const location = useLocation();
  console.log(location.state);

  return (
    <>
      <div>Home </div>
      <Link to="/">HOME</Link>
    </>
  );
}
