import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MarketPlace } from "./pages/MarketPlace";
import { Nav } from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./pages/admin/AdminLayout";
import Profile from "./pages/admin/Profile";
import ProtectedRoute from "./redux/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="  font-mono">
      <div>
        <Nav />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
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

// //import { useState } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";

// import "./App.css";
// import Home from "./pages/Home";
// import { MarketPlace } from "./pages/MarketPlace";
// import { Nav } from "./components/Nav";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminLayout from "./pages/admin/AdminLayout";
// import Profile from "./pages/admin/Profile";

// function App() {
//   const [count, setCount] = useState(0);
//   const location = useLocation();

//   // hide Nav when url starts with "/admin"
//   const hideNav = location.pathname.startsWith("/admin");

//   return (
//     <div className="font-mono">
//       <Routes>
//         <Route path="/admin" element={<AdminLayout />} />
//       </Routes>

//       {!hideNav && <Nav />} {/* only show Nav if not /admin */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/market" element={<MarketPlace />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
