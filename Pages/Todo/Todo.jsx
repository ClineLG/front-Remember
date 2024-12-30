import "./todo.css";
import { useState } from "react";
const Todo = () => {
  const [task, setTask] = useState("");
  //   const [data, setData] = useState(null);
  return (
    <section>
      <div className="container toDo">
        <div className="pro"> </div>
        <div className="perso"> </div>
        <form>
          <input
            type="text"
            name="task"
            placeholder="nouvelle tâche"
            onChange={(event) => {
              setTask(event.target.value);
            }}
            value={task}
          />
          <div className="row">
            <div>
              <label htmlFor="pro">Pro</label>
              <input type="checkbox" id="pro" />
            </div>
            <div>
              <label htmlFor="perso">Perso</label>
              <input type="checkbox" id="Perso" />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="urgent">urgent</label>
              <input type="checkbox" id="urgent" />
            </div>
            <div>
              <label htmlFor="ok">peut attendre</label>
              <input type="checkbox" id="ok" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Todo;
