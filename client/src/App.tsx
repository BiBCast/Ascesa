import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/pages/Login/Login";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import { Home } from "./components/pages/Home/Home";
import { CreateChannel } from "./components/pages/CreateChannel/CreateChannel";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/home"
        element={<AuthGuard component={<Home UserId="" />} />}
      />
      <Route
        path="/createChannel"
        element={<AuthGuard component={<CreateChannel />} />}
      />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
