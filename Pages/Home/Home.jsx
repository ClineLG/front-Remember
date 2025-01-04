import { Link } from "react-router-dom";

import "./home.css";
import picture from "../../src/assets/imgs/remember.jpg";
const Home = () => {
  return (
    <div className="sec home">
      <h2>Ne laissez rien échapper à votre mémoire </h2>
      <div className="hero container">
        <div className="left-hero">
          <ul>
            <li>Gérez vos tâches et vos pensées avec facilité</li>

            <li>Capturez vos idées</li>
            <li>Organisez vos priorités</li>
            <li>Libérez votre esprit pour un quotidien plus serein</li>
          </ul>
          <Link className="button-login" to="/signup">
            Commencer !
          </Link>
        </div>

        <img src={picture} alt="picture to do list" />
      </div>
    </div>
  );
};

export default Home;
