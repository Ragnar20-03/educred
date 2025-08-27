import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MarketPlace } from "./pages/MarketPlace";
import { Nav } from "./components/Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="  font-mono">
      <div>
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<MarketPlace />} />
      </Routes>
    </div>
  );
}

export default App;
