import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import { Login } from "./components/pages/Login/Login";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
