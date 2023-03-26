import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getToken } from "./util/util";
import { UserContext } from "./context/user";
import { getUser } from "./api/user";
import Layout from "./pages/Layout";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  let fetchUser = async () => {
    const data = await getUser();
    if (data.statusCode === 200) {
      setUser(data.data.data);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    const token = getToken();
    // Redirect to login page if there is no token
    if (!token) {
      navigate("/login");
    } else {
      if (location.pathname === "/login") {
        navigate("/");
      }
      fetchUser();
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
