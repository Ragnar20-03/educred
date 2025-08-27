import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MarketPlace } from "./pages/MarketPlace";
import { Nav } from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./pages/AdminLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="  font-mono">
      <div>
        <Nav />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/market" element={<MarketPlace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
