import "./create-ideas.css";
import { GrDocumentUpload } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateIdea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userToken } = location.state;
  //   console.log("UT", userToken);
  const [imageUpload, setImageUpload] = useState(null);
  const [newIdea, setNewIdea] = useState({ think: "", image: null, title: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      setErrorMessage(
        "Vous n'avez pas saisi de texte et vous n'avez pas téléchargé d'image"
      );
    } else if (!title) {
      setErrorMessage("Vous devez écrire un titre !");
    } else {
      const formData = new FormData();
      formData.append("think", think);
      formData.append("title", title);
      formData.append("image", image);
      setIsLoading(true);
      try {
        const response = await axios.put(
          "https://site--backend-remember--dm4qbjsg7dww.code.run/user/addThink",
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
        // setSubmit(!submit);
        setIsLoading(false);
        navigate("/ideas");
        // console.log(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <section className="create sec">
      <div className="container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h1>Ma nouvelle pensée</h1>
          <div>
            <label htmlFor="title">Titre :</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Mon titre..."
              onChange={(event) => {
                const obj = { ...newIdea };
                obj.title = event.target.value;
                setNewIdea(obj);
              }}
            />
          </div>
          <div>
            <label htmlFor="idea">Ma pensée :</label>
            <textarea
              id="idea"
              type="text"
              name="idea"
              placeholder="Ma pensée..."
              rows={10}
              onChange={(event) => {
                const obj = { ...newIdea };
                obj.think = event.target.value;
                setNewIdea(obj);
              }}
            />
          </div>
          <label htmlFor="img" className="img-create">
            <div className="notu">
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
            className="inputAvatar"
            id="img"
            type="file"
            name="image"
            onChange={(event) => {
              handleNewFile(event);
            }}
          />
          {isLoading && (
            <div className="little-loader-container">
              <div className="loader"></div>
            </div>
          )}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button disabled={isLoading ? true : false} className="submit-button">
            Enregistrer !
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateIdea;
