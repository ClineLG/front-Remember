import { GiBrain } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { BiLogOutCircle } from "react-icons/bi";

const Header = ({ user, logout }) => {
  const navigate = useNavigate();
  console.log(user);
  return (
    <header>
      <div className="container header">
        <div
          className="logo-container"
          onClick={() => {
            user ? navigate("/home") : navigate("/");
          }}
        >
          <GiBrain className="logo" />
          <h1>Remember</h1>
        </div>

        {user && (
          <div onClick={logout} className="login-button">
            <BiLogOutCircle />

            {user.avatar && (
              <img
                src={user.avatar.secure_url}
                alt=""
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <span>{user.username}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
