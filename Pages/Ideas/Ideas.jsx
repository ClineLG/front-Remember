import "./ideas.css";
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import idea from "../../src/assets/imgs/idea.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Ideas = () => {
  const userToken = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [ideas, setIdeas] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState(null);
  const [query, setQuery] = useState({ page: 1, search: "", date: "" });
  const [date, setDate] = useState(null);
  const [counter, setCounter] = useState(0);
  const limit = 20;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/allThoughts/?page=${query.page}${
            query.search && "&search=" + query.search
          }${query.date && "&date=" + query.date}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        const tab = response.data.thinks.reverse();
        setCounter(response.data.counter);
        setIdeas(tab);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [submit, query]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://site--backend-remember--dm4qbjsg7dww.code.run/user/deleteThink/${id}`,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const obj = { ...query };
    if (search) {
      let searchToDo = search;
      if (searchToDo.trim() !== "") {
        obj.search = searchToDo.trim();
      }
    }

    if (date) {
      obj.date = date;
    }

    obj.page = 1;
    setQuery(obj);
    setSearch("");
    setDate("");
  };
  const tab = [];

  const pageNum = Math.ceil(counter / limit);

  for (let i = 1; i <= pageNum; i++) {
    tab.push(i);
  }

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <section className="ideasSec">
      <Link className="newIdea" to="/newIdea" state={{ userToken: userToken }}>
        <img src={idea} alt="illustration idée" />
        <p>Une Nouvelle Pensée à conserver ?</p>
      </Link>
      <div className="container">
        <div className="allIdeas">
          <div className="divForm">
            <p className="title">Chercher mes pensées</p>
            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div className="searchInput">
                <label htmlFor="search">Par mots clés :</label>
                <input
                  id="search"
                  type="text"
                  name="search"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  value={search ? search : ""}
                />
              </div>
              <div className="searchInput">
                <label htmlFor="dateP">Par date :</label>
                <DatePicker
                  id="dateP"
                  selected={date}
                  onChange={(date) => {
                    setDate(date);
                  }}
                />
              </div>
              <div className="buttonIdea">
                <button className="submit-button">Trouver</button>
                {query.search || query.date ? (
                  <button
                    type="button"
                    onClick={() => {
                      const obj = { ...query, search: "", date: "" };
                      setQuery(obj);
                    }}
                    className="submit-button bis"
                  >
                    Retrouver toutes mes pensées
                  </button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
          {counter ? (
            <div className="idea-counter">
              <p>nombre de pensées : {counter}</p>
            </div>
          ) : (
            <div className="idea-counter">
              <p>Aucune pensées</p>
            </div>
          )}

          {ideas.map((idea) => {
            return (
              <div key={idea._id} className="idea">
                <FaTrashAlt
                  className="trash"
                  onClick={() => {
                    handleDelete(idea._id);
                  }}
                />
                {idea.title ? <h2>{idea.title}</h2> : <h2>Sans titre</h2>}
                {idea.image && <img src={idea.image.secure_url} />}
                {idea.think && <p>{idea.think}</p>}{" "}
                <span>
                  créé le {idea.date.slice(8, 10)}/{idea.date.slice(5, 7)}/
                  {idea.date.slice(0, 4)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="page">
        <label>
          Page :{" "}
          <select
            name="selectedPage"
            defaultValue={query.page}
            onChange={(event) => {
              const obj = { ...query, page: event.target.value };
              setQuery(obj);
            }}
          >
            {tab.length > 0 ? (
              tab.map((page) => {
                return (
                  <option value={page} key={page}>
                    {page}
                  </option>
                );
              })
            ) : (
              <option value={1} key={1}>
                1
              </option>
            )}
          </select>
        </label>
      </div>
    </section>
  );
};

export default Ideas;
