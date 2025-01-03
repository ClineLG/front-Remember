import "./update.css";
import axios from "axios";
import { useState } from "react";
import { GrDocumentUpload } from "react-icons/gr";

const Update = ({ user, login }) => {
  //   console.log("token", user.token);
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
    console.log(userDetails.avatar);
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
    if (!username && !email && !password && !confirmPassword && !avatar) {
      setErrorMessage("Veuillez aporter des changements");
    } else if (password && password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
    } else {
      const formData = new FormData();
      if (email) {
        formData.append("email", email);
      }
      if (username) {
        formData.append("username", username);
      }
      if (password) {
        formData.append("password", password);
      }
      if (avatar) {
        formData.append("image", avatar);
      }
      setIsLoading(true);
      try {
        const response = await axios.put(
          //   "https://site--backend-remember--dm4qbjsg7dww.code.run/user/signup",
          "http://localhost:3002/user/update",
          formData,

          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
          {
            "Content-Type": "multipart/form-data",
          }
        );
        console.log(response.data);
        setIsLoading(false);
        login(response.data);
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.message === "email already used") {
          setErrorMessage("Cet adresse email est déjà utilisée");
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="signup update">
      <div className="container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h1>Mettre à jour mes informations</h1>

          <input
            type="email"
            name="email"
            placeholder={user.email}
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
            placeholder={user.username}
            onChange={(event) => {
              setErrorMessage(null);

              const obj = { ...userDetails, username: event.target.value };
              setUserDetails(obj);
            }}
            value={userDetails.username}
          />
          <label htmlFor="uploadAvatar" className="labelAvatar">
            <div>
              Changer mon avatar <GrDocumentUpload />
            </div>
            {imageUpload ? (
              <img
                src={imageUpload}
                alt="picture upload preview"
                className="avatarPreview"
              />
            ) : (
              <img
                src={user.avatar.secure_url}
                alt="avatar preview"
                className="avatarPreview opacity"
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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button disabled={isLoading ? true : false}>Mettre à jour</button>
        </form>
      </div>
    </section>
  );
};

export default Update;
