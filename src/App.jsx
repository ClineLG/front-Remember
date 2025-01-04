import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import MyHome from "../Pages/MyHome/MyHome";
import Todo from "../Pages/Todo/Todo";
import Ideas from "../Pages/Ideas/ideas";
import CreateIdea from "../Pages/CreateIdea/createIdea";
import UpdateAccount from "../Pages/UpdateAccount/updateAccount";
import Update from "../Pages/Update/Update";
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
        <Route path="/todo" element={<Todo />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/newIdea" element={<CreateIdea />} />
        <Route
          path="/account"
          element={<UpdateAccount user={user} logout={logout} />}
        />
        <Route path="/update" element={<Update user={user} login={login} />} />
      </Routes>
      <Footer />
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
