import "./update-account.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateAccount = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3002/user/deleteUser",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(response);
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="updateA">
      <div className="container">
        <div className="update-container">
          <h1>Mon Compte</h1>
          <div className="updateA-div">
            <span>Pseudo : </span>
            <p>{user.username}</p>
          </div>
          <div className="updateA-div spe">
            <span>adresse e-mail : </span>
            <p>{user.email}</p>
          </div>
          <div className="updateA-div pad">
            <span>Avatar :</span>
            {user.avatar && <img src={user.avatar.secure_url} />}
          </div>
          <button
            onClick={() => {
              navigate("/update");
            }}
            className="submit-button"
          >
            Mettre à jour mes infos
          </button>
          <button onClick={() => logout()} className="submit-button">
            Se déconnecter
          </button>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="submit-button red"
          >
            Supprimer ce compte
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpdateAccount;
