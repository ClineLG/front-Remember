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
    <div>
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
        <button disabled={isLoading ? true : false}>Go !</button>
      </form>
    </div>
  );
};

export default CreateIdea;
