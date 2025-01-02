import "./ideas.css";
import { GrDocumentUpload } from "react-icons/gr";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Ideas = () => {
  const userToken = Cookies.get("token");
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newIdea, setNewIdea] = useState(null);
  const [ideas, setIdeas] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewFile = (event) => {
    const file = event.target.files[0];
    setNewIdea({ ...newIdea, image: file });
    handleImageUpload(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { think, image, title } = newIdea;
    if (!think && !image) {
      setErrorMessage("Vous n'avez saisi ni texte ni uploadé d'image");
    } else {
      const formData = new FormData();
      formData.append("think", think);
      formData.append("title", title);
      formData.append("image", image);
      setIsLoading(true);
      try {
        const response = await axios.put(
          "http://localhost:3002/user/addThink",
          formData,

          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          },
          {
            "Content-Type": "multipart/form-data",
          }
        );
        setSubmit(!submit);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <section>
      <div className="container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h1> Une nouvelle idée ?</h1>
          <input
            type="text"
            name="title"
            onChange={(event) => {
              const obj = { ...newIdea };
              obj.title = event.target.value;
              setNewIdea(obj);
            }}
          />
          <textarea
            type="text"
            name="idea"
            rows={5}
            onChange={(event) => {
              const obj = { ...newIdea };
              obj.think = event.target.value;
              setNewIdea(obj);
            }}
          />
          <label htmlFor="img">
            <div>
              Ajouter une image <GrDocumentUpload />
            </div>
            {imageUpload && (
              <img
                src={imageUpload}
                alt="picture upload preview"
                className="preview"
              />
            )}
          </label>
          <input
            className="inputImg"
            id="img"
            type="file"
            name="image"
            onChange={(event) => {
              handleNewFile(event);
            }}
          />
          <button>Go !</button>
        </form>
        <div>
          <h1>Toutes mes idées</h1>
          {ideas.map((idea) => {
            return (
              <div key={idea._id}>
                <span>
                  créé le {idea.date.slice(8, 10)}/{idea.date.slice(5, 7)}/
                  {idea.date.slice(0, 4)}
                </span>
                <h2>{idea.title}</h2>
                <img src={idea.image.secure_url} /> <p>{idea.think}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ideas;
