import { FaTrashAlt } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";
import "./sort-task.css";
const SortTask = ({ data, handleDone, handleDelete }) => {
  return data.map((task) => {
    return (
      <div key={task._id} className="tasklist">
        <div
          className={task.done ? `checkbox activ` : "checkbox"}
          onClick={() => handleDone(task._id)}
        ></div>
        <div className={task.done ? "row activ-p" : "row"}>
          {task.emergency ? (
            <FaHotjar className="hot" />
          ) : (
            <div className="notEm"></div>
          )}

          <p className="p-task">{task.task}</p>
        </div>
        <div className="endLineT">
          <span>
            créé le {task.date.slice(8, 10)}/{task.date.slice(5, 7)}/
            {task.date.slice(0, 4)}
          </span>
          <FaTrashAlt
            className="trash"
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
