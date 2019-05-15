import React, { useState, useEffect, useContext } from "react";
import { postRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import { navigate } from "@reach/router";
import RightRForm from "./RightRForm";
import LeftRForm from "./LeftRForm";
import IngredientsList from "./IngredientsList";
import imageCompression from "browser-image-compression";
import HistoryContext from "../contextComponents/history.context";

export default function RecipesForm(props) {
  const [select, setSelect] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState("");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(
    "https://rardrayrails.s3.amazonaws.com/1554662862340"
  );
  const [load, setLoad] = useState(true);
  const { history } = useContext(HistoryContext);

  const show = [];
  for (let i = 0; i < ingredients.length; i++) {
    for (let j = 0; j < history.length; j++) {
      if (ingredients[i].historyId === history[j]._id) {
        show[i] = {
          ...history[j],
          count: 1,
          measure: ingredients[i].amount
        };
      }
    }
  }
  useEffect(() => {
    async function handleImage() {
      if (!file) {
        return null;
      }
      setLoad(false);
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      };
      try {
        const compressedFile = await imageCompression(file, options);
        await imageUpload(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
    function imageUpload(image) {
      const imgdata = new FormData();
      imgdata.append("image", image);
      postRequest(
        "/api/upload",
        apiToken(),
        imgdata,
        res => {
          return setImage(res.data.imageUrl);
        },
        null,
        () => setLoad(true)
      );
    }
    handleImage();
  }, [file]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    if (!title || !show) {
      return;
    }
    const submitData = {
      title: title,
      userId: props.user._id,
      instructions: instructions,
      image: image,
      ingredients: ingredients
    };
    postRequest("/api/recipe/post", apiToken(), submitData, function(data) {
      return navigate("/grocery/recipe/" + data.data._id);
    });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div className="list-items" style={{ marginBottom: 0 }}>
        <div className="r-contain" style={{ marginTop: 10 }}>
          <br />
          <RightRForm
            changeText={e => setInstructions(e.target.value)}
            changeTitle={e => setTitle(e.target.value)}
            {...{ title, instructions }}
            device={props.device}
          />
          <LeftRForm
            changeFile={e => {
              setFile(e.target.files[0]);
            }}
            changeSelect={e => setSelect(e.target.value)}
            changeMeasure={e => setMeasure(e.target.value)}
            submit={() => {
              setIngredients([
                ...ingredients,
                { historyId: select, amount: measure }
              ]);
              setMeasure("");
            }}
            lists={show.map(el => {
              return (
                <IngredientsList
                  key={el._id}
                  title={el.title}
                  image={el.image}
                  measure={el.measure}
                />
              );
            })}
            {...{ load, image, select, measure }}
            history={history}
            device={props.device}
          />
          <br />
          <button className="button-blue-full" onClick={handleSubmit}>
            Save Recipe
          </button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 125 }} />
    </div>
  );
}
