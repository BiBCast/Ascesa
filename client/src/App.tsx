import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/pages/Login/Login";
import AuthGuard from "./components/AuthGuard/AuthGuard";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<AuthGuard />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
