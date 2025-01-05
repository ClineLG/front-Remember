import { FaTrashAlt } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";
import "./sort-task.css";
import { FaCheck } from "react-icons/fa";

const SortTask = ({ data, handleDone, handleDelete, setStickyTask }) => {
  const shorter = (str, num) => {
    let newStr = "";
    for (let i = 0; i < num; i++) {
      newStr += str[i];
    }
    newStr += "...";
    return newStr;
  };

  return data.map((task) => {
    return (
      <div key={task._id} className="tasklist">
        <div
          className={task.done ? `checkbox activ` : "checkbox"}
          onClick={() => handleDone(task._id)}
        >
          <FaCheck className={task.done ? "checkTask activ" : "checkTask"} />
        </div>
        <div className={task.done ? "row activ-p" : "row"}>
          {task.emergency ? (
            <FaHotjar className="hot" />
          ) : (
            <div className="notEm"></div>
          )}

          <p
            className="p-task"
            onClick={() => {
              const obj = {};
              obj.task = task.task;
              obj.date =
                task.date.slice(8, 10) +
                "/" +
                task.date.slice(5, 7) +
                "/" +
                task.date.slice(0, 4);
              setStickyTask(obj);
            }}
          >
            {task.task.length > 20 ? shorter(task.task, 25) : task.task}
          </p>
        </div>
        <div className="endLineT">
          <span>
            créée le {task.date.slice(8, 10)}/{task.date.slice(5, 7)}/
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
