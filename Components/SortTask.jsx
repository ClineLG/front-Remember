import { FaTrashAlt } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";

const SortTask = ({ data, handleDone, handleDelete }) => {
  return data.map((task) => {
    return (
      <div key={task._id} className="task">
        <div
          className={task.done ? `checkbox activ` : "checkbox"}
          onClick={() => handleDone(task._id)}
        ></div>
        <div className="row">
          {task.emergency && <FaHotjar />}

          <p className={task.done ? "p-task activ-p" : "p-task"}>{task.task}</p>
        </div>
        <div>
          <span>
            créé le {task.date.slice(8, 10)}/{task.date.slice(5, 7)}/
            {task.date.slice(0, 4)}
          </span>
          <FaTrashAlt
            onClick={() => {
              handleDelete(task._id);
            }}
          />
        </div>
      </div>
    );
  });
};

export default SortTask;
