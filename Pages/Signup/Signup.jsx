import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { GrDocumentUpload } from "react-icons/gr";
import axios from "axios";
const Signup = ({ login }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewFile = (event) => {
    const file = event.target.files[0];
    // console.log("FIle", file);
    setUserDetails({ ...userDetails, avatar: file });
    handleImageUpload(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword, avatar } = userDetails;
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs");
    } else if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", avatar);
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://site--backend-remember--dm4qbjsg7dww.code.run/user/signup",
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        );
        setIsLoading(false);
        login(response.data);
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "email already used") {
          setErrorMessage("Cet adresse email est déjà utilisée");
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="signup sec">
      <div className="container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h1>Inscription</h1>

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
            type="text"
            name="username"
            placeholder="Pseudo"
            onChange={(event) => {
              setErrorMessage(null);

              const obj = { ...userDetails, username: event.target.value };
              setUserDetails(obj);
            }}
            value={userDetails.username}
          />
          <label htmlFor="uploadAvatar" className="labelAvatar">
            <div>
              Ajouter un avatar <GrDocumentUpload />
            </div>
            {imageUpload && (
              <img
                src={imageUpload}
                alt="picture upload preview"
                className="avatarPreview"
              />
            )}
          </label>
          <input
            className="inputAvatar"
            id="uploadAvatar"
            type="file"
            name="avatar"
            onChange={(event) => {
              handleNewFile(event);
            }}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez mot de passe"
            onChange={(event) => {
              setErrorMessage(null);
              const obj = {
                ...userDetails,
                confirmPassword: event.target.value,
              };
              setUserDetails(obj);
            }}
            value={userDetails.confirmPassword}
          />
          {isLoading && (
            <div className="little-loader-container">
              <div className="loader"></div>
            </div>
          )}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button disabled={isLoading ? true : false}>S'inscrire</button>

          <Link to="/login">Déjà inscrit ? Se connecter</Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
