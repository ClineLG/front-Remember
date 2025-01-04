import "./ideas.css";
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import idea from "../../src/assets/imgs/idea.jpg";
const Ideas = () => {
  const userToken = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [ideas, setIdeas] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState(null);
  const [seekIdea, setSeekIdea] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-remember--dm4qbjsg7dww.code.run/user/allThoughts",
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        // console.log(response.data);
        const tab = response.data.thinks.reverse();
        setIdeas(tab);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [submit]);

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

  const WhereIsThisText = (str) => {
    const newStr = str.toUpperCase();
    const tabStr = newStr.split(" ");
    const tab = [];
    for (let i = 0; i < ideas.length; i++) {
      for (let j = 0; j < tabStr.length; j++) {
        if (ideas[i].think) {
          let txt2 = ideas[i].think.toUpperCase();

          if (txt2.includes(tabStr[j])) {
            tab.push(ideas[i]);
          }
        }
      }
      if (tab.length > 0) {
        const finalArr = [...new Set(tab)];
        setSeekIdea(finalArr);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let searchToDo = search;
    if (searchToDo.trim() === "") {
      null;
    } else {
      WhereIsThisText(search);
      setSearch("");
    }
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <section className="ideasSec">
      <Link className="newIdea" to="/newIdea" state={{ userToken: userToken }}>
        <img src={idea} alt="illustration idée" />
        <p>Une Nouvelle Pensée à conserver ?</p>
      </Link>
      <div className="container">
        <div className="allIdeas">
          {/* <h1>Toutes mes pensées</h1> */}
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="searchInput">
              <label htmlFor="search">
                Chercher mes pensées par mots clés :
              </label>
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
            <div className="buttonIdea">
              <button className="submit-button">Trouver</button>
              {seekIdea && (
                <button
                  type="button"
                  onClick={() => {
                    setSeekIdea(null);
                  }}
                  className="submit-button bis"
                >
                  Retrouver toutes mes pensées
                </button>
              )}
            </div>
          </form>
          {seekIdea
            ? seekIdea.map((idea) => {
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
                    {idea.think && <p>{idea.think}</p>}
                    <span>
                      créé le {idea.date.slice(8, 10)}/{idea.date.slice(5, 7)}/
                      {idea.date.slice(0, 4)}
                    </span>
                  </div>
                );
              })
            : ideas.map((idea) => {
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
    </section>
  );
};

export default Ideas;
