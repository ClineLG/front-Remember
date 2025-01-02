import "./todo.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTrashAlt } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";
import SortTask from "../../Components/SortTask";
const Todo = () => {
  const [task, setTask] = useState("");
  const [pro, setPro] = useState(false);
  const [perso, setPerso] = useState(true);
  const [emergency, setEmergency] = useState(false);
  const [dataPro, setDataPro] = useState(null);
  const [dataPerso, setDataPerso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [counterDone, setCounterDone] = useState(0);
  const userToken = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(
      `http://localhost:3002/user/addTask`,
      {
        task: task,
        pro: pro,
        perso: perso,
        emergency: emergency,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );
    setSubmit(!submit);
    console.log(response.data);
  };
  const handleDone = async (taskId) => {
    try {
      const response = await axios.put(
        "http://localhost:3002/user/taskDone",
        { taskId: taskId },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      setSubmit(!submit);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/user/deleteTask/${taskId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      setSubmit(!submit);
    } catch (error) {
      console.log(error);
    }
  };
  const createObj = (tab) => {
    const obj = {};
    const tabE = [];
    const tabD = [];
    const tabO = [];

    for (let j = 0; j < tab.length; j++) {
      if (tab[j].emergency && !tab[j].done) {
        tabE.push(tab[j]);
      } else if (!tab[j].done) {
        tabO.push(tab[j]);
      } else tabD.push(tab[j]);
    }
    obj.emergency = tabE;
    obj.done = tabD;
    obj.todo = tabO;
    return obj;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/user/allTasks",
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        const tabPro = [];
        const tabPers = [];
        for (let i = 0; i < response.data.todos.length; i++) {
          if (response.data.todos[i].pro) {
            tabPro.push(response.data.todos[i]);
          } else {
            tabPers.push(response.data.todos[i]);
          }
        }

        setDataPerso(createObj(tabPers));
        setDataPro(createObj(tabPro));

        setCounterDone(
          createObj(tabPers).done.length + createObj(tabPro).done.length
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [submit]);

  return isLoading ? (
    <div>isLoading</div>
  ) : (
    <section className="tasks">
      <div className="container">
        {" "}
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
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
              <input
                type="checkbox"
                id="pro"
                onChange={() => {
                  setPro(!pro);
                  setPerso(false);
                }}
              />
            </div>
            <div>
              <label htmlFor="perso">Perso</label>
              <input
                type="checkbox"
                id="Perso"
                onChange={() => {
                  setPerso(true);
                  setPro(false);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="urgent">urgent</label>
              <input
                type="checkbox"
                id="urgent"
                onChange={() => {
                  setEmergency(!emergency);
                }}
              />
            </div>
          </div>
          <button>go !</button>
        </form>
        {counterDone !== 0 && <p>{counterDone} tâches réalisées !</p>}
        <div className="toDo">
          <div className="pro">
            <SortTask
              data={dataPro.emergency}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
            <SortTask
              data={dataPro.todo}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
            <SortTask
              data={dataPro.done}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
          </div>
          <div className="perso">
            <SortTask
              data={dataPerso.emergency}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
            <SortTask
              data={dataPerso.todo}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
            <SortTask
              data={dataPerso.done}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todo;
