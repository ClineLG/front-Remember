import { GiBrain } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import userDefault from "../../src/assets/imgs/user.png";
import "./header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();
  // console.log(user);
  return (
    <header>
      <div className="header">
        <div className="container">
          <div
            className="logo-container"
            onClick={() => {
              user ? navigate("/home") : navigate("/");
            }}
          >
            <GiBrain className="logo" />
            <h1>Remember</h1>
          </div>
        </div>

        {user && (
          <>
            <div
              className="login-button"
              onClick={() => {
                navigate("/account");
              }}
            >
              {user.avatar ? (
                <img src={user.avatar.secure_url} alt="avatar" />
              ) : (
                <img src={userDefault} alt="avatar" />
              )}
              <span>{user.username}</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
