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
    <section>
      <div className="container">
        <h1>Mon Compte</h1>
        <div>
          <p>{user.username}</p>
          <p>{user.email}</p>
          {user.avatar && <img src={user.avatar.secure_url} />}
          <p>******</p>
        </div>
        <button
          onClick={() => {
            navigate("/update");
          }}
        >
          Mettre à jour mes infos
        </button>
        <button onClick={() => logout()}>Se déconnecter</button>
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Supprimer ce compte
        </button>
      </div>
    </section>
  );
};

export default UpdateAccount;
