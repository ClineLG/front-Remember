import "./todo.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SortTask from "../../Components/SortTask/SortTask";
import { IoMdClose } from "react-icons/io";

const Todo = () => {
  const [task, setTask] = useState("");
  const [pro, setPro] = useState(false);
  const [perso, setPerso] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [dataPro, setDataPro] = useState(null);
  const [dataPerso, setDataPerso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [counterDone, setCounterDone] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [stickyTask, setStickyTask] = useState({ date: "", task: "" });
  const userToken = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!task) {
      setErrorMessage("Veuillez entrer une tâche");
      return;
    }
    let proToSend;
    let persoToSend;
    if (!pro && !perso) {
      persoToSend = true;
      proToSend = pro;
    } else if (pro && perso) {
      (persoToSend = true), (proToSend = false);
    } else {
      persoToSend = perso;
      proToSend = pro;
    }

    const response = await axios.put(
      `https://site--backend-remember--dm4qbjsg7dww.code.run/user/addTask`,
      {
        task: task,
        pro: proToSend,
        perso: persoToSend,
        emergency: emergency,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );
    setSubmit(!submit);
    setTask("");
    console.log(response.data);
  };
  const handleDone = async (taskId) => {
    try {
      const response = await axios.put(
        "https://site--backend-remember--dm4qbjsg7dww.code.run/user/taskDone",
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
        `https://site--backend-remember--dm4qbjsg7dww.code.run/user/deleteTask/${taskId}`,
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
    <section className="tasks sec">
      <div className="container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            type="text"
            name="task"
            placeholder="Une nouvelle tâche ?"
            onChange={(event) => {
              setTask(event.target.value);
              setErrorMessage("");
            }}
            value={task}
          />
          <div className="row top">
            <div className="cB-container">
              <div>
                <input
                  type="checkbox"
                  id="pro"
                  onChange={() => {
                    setPro(!pro);
                  }}
                />
                <label htmlFor="pro">Pro</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="Perso"
                  onChange={() => {
                    setPerso(!perso);
                  }}
                />
                <label htmlFor="perso">Perso</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="urgent"
                  onChange={() => {
                    setEmergency(!emergency);
                  }}
                />
                <label htmlFor="urgent">Urgent</label>
              </div>
            </div>

            <button className="submit">Ajouter !</button>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </div>
      {counterDone !== 0 && (
        <p className="taskCounter">Au total : {counterDone} tâches réalisées</p>
      )}
      {stickyTask && (
        <div className="taskToShow">
          <IoMdClose
            className="close"
            onClick={() => {
              setStickyTask("");
            }}
          />
          <div>
            <p>Le {stickyTask.date} :</p>
            <p className="taskP"> - {stickyTask.task}</p>
          </div>
        </div>
      )}
      <div className="container toDo">
        <div className="pro">
          <h1>Mes tâches pro</h1>
          <SortTask
            setStickyTask={setStickyTask}
            data={dataPro.emergency}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
          <SortTask
            setStickyTask={setStickyTask}
            data={dataPro.todo}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
          <SortTask
            setStickyTask={setStickyTask}
            data={dataPro.done}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
        </div>
        <div className="perso">
          <h1>Mes tâches perso</h1>
          <SortTask
            setStickyTask={setStickyTask}
            data={dataPerso.emergency}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
          <SortTask
            setStickyTask={setStickyTask}
            data={dataPerso.todo}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
          <SortTask
            setStickyTask={setStickyTask}
            data={dataPerso.done}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
        </div>
      </div>
    </section>
  );
};

export default Todo;
