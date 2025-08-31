import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MarketPlace } from "./pages/MarketPlace";
import { Nav } from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./pages/admin/AdminLayout";

import ProtectedRoute from "./redux/ProtectedRoute";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModal,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

function App() {
  const [count, setCount] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="  font-mono">
      <div>
        <Nav />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/market" element={<MarketPlace />} />
      </Routes>
    </div>
  );
}

export default App;
