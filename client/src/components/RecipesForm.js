import React, { useState, useEffect } from "react";
import Button from "./Styles/Button";
import { postRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import { navigate } from "@reach/router";
import RightRForm from "./RightRForm";
import LeftRForm from "./LeftRForm";
import IngredientsList from "./IngredientsList";

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

  const show = [];
  for (let i = 0; i < ingredients.length; i++) {
    for (let j = 0; j < props.history.length; j++) {
      if (ingredients[i].items === props.history[j].id) {
        show[i] = {
          ...props.history[j],
          count: 1,
          measure: ingredients[i].measure
        };
      }
    }
  }
  useEffect(() => {
    const uploadImage = () => {
      if (!file) {
        return null;
      }
      setLoad(false);
      const imgdata = new FormData();
      imgdata.append("image", file);
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
    };
    uploadImage();
  }, [file]);

  const handleSubmit = () => {
    if (!title || !show) {
      return;
    }
    const submitData = {
      title: title,
      instructions: instructions,
      image: image,
      ingredients: show
    };
    postRequest("/api/recipe/post", apiToken(), submitData, function(data) {
      return navigate("/grocery/recipe/" + data.data._id);
    });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div className="list-items">
        <div style={{ border: "1px solid blue", borderRadius: 10, padding: 6 }}>
          <br />
          <RightRForm
            changeText={e => setInstructions(e.target.value)}
            changeTitle={e => setTitle(e.target.value)}
            {...{ title, instructions }}
          />
          <LeftRForm
            changeFile={e => {
              setFile(e.target.files[0]);
            }}
            changeSelect={e => setSelect(parseInt(e.target.value))}
            changeMeasure={e => setMeasure(e.target.value)}
            submit={() => {
              setIngredients([
                ...ingredients,
                { items: select, measure: measure }
              ]);
              setMeasure("");
            }}
            lists={show.map(el => {
              return (
                <IngredientsList
                  title={el.title}
                  image={el.image}
                  measure={el.measure}
                />
              );
            })}
            {...{ load, image, select, measure }}
            history={props.history}
          />

          <br />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button label="Save Recipe" click={handleSubmit} />
      </div>
    </div>
  );
}