import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import { Login } from "./components/pages/Login/Login";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/" element={<Login />} /> 
    </Routes>
  </BrowserRouter>
);

export default App;
