import "./ideas.css";
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
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
          "http://localhost:3002/user/allThoughts",
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        console.log(response.data);
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
        `http://localhost:3002/user/deleteThink/${id}`,
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
    WhereIsThisText(search);
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <section>
      <div className="container">
        <Link to="/newIdea" state={{ userToken: userToken }}>
          Une Nouvelle Pensée ?
        </Link>
        <div>
          <h1>Toutes mes idées</h1>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <input
              type="text"
              name="search"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <button>Trouver</button>
          </form>

          {seekIdea && (
            <button
              onClick={() => {
                setSeekIdea(null);
              }}
            >
              Retrouver toutes mes pensées
            </button>
          )}
          {seekIdea
            ? seekIdea.map((idea) => {
                return (
                  <div key={idea._id}>
                    <span>
                      créé le {idea.date.slice(8, 10)}/{idea.date.slice(5, 7)}/
                      {idea.date.slice(0, 4)}
                    </span>
                    {idea.title && <h2>{idea.title}</h2>}
                    {idea.image && <img src={idea.image.secure_url} />}{" "}
                    {idea.think && <p>{idea.think}</p>}
                  </div>
                );
              })
            : ideas.map((idea) => {
                return (
                  <div key={idea._id}>
                    <span>
                      créé le {idea.date.slice(8, 10)}/{idea.date.slice(5, 7)}/
                      {idea.date.slice(0, 4)}
                    </span>{" "}
                    <FaTrashAlt
                      onClick={() => {
                        handleDelete(idea._id);
                      }}
                    />
                    {idea.title && <h2>{idea.title}</h2>}
                    {idea.image && <img src={idea.image.secure_url} />}{" "}
                    {idea.think && <p>{idea.think}</p>}
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Ideas;
