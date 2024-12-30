import { useEffect } from "react";
import "./my-home.css";
import { useNavigate } from "react-router-dom";
import idea from "../../src/assets/imgs/thougths.jpg";
import task from "../../src/assets/imgs/todo.jpg";
const MyHome = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <section>
      <div className="container my-home">
        <div
          onClick={() => {
            navigate("/todo");
          }}
        >
          <img src={task} alt="" />
          <p>Mes tâches</p>
        </div>
        <div
          onClick={() => {
            navigate("/ideas");
          }}
        >
          <img src={idea} alt="" />

          <p to="">Mes Pensée</p>
        </div>
      </div>
    </section>
  );
};

export default MyHome;
