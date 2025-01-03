import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = ({ login }) => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        // "https://site--backend-remember--dm4qbjsg7dww.code.run/user/login",

        "http://localhost:3002/user/login",
        userDetails
      );
      setIsLoading(false);

      login(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="signup">
      <div className="container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h1>Connection</h1>

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={(event) => {
              setErrorMessage(null);

              const obj = { ...userDetails, email: event.target.value };
              setUserDetails(obj);
            }}
            value={userDetails.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setErrorMessage(null);

              const obj = { ...userDetails, password: event.target.value };
              setUserDetails(obj);
            }}
            value={userDetails.password}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button disabled={isLoading ? true : false}>Se connecter</button>
          <Link to="/signup">Pas encore inscrit ? Se créer un compte</Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
