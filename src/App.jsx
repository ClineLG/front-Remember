import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Header from "../Components/Header/Header";
import MyHome from "../Pages/MyHome/MyHome";
import "./App.css";
import { useState, useEffect } from "react";
import Login from "../Pages/Login/Login";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  };
  const login = (userDetails) => {
    localStorage.setItem("user", JSON.stringify(userDetails));
    setUser(userDetails);
    Cookies.set("token", userDetails.token, { expires: 30 });
    navigate("/home");
  };

  const localStorageUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  useEffect(() => {
    localStorageUser();
  }, []);
  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <Header user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup login={login} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/home" element={<MyHome />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}