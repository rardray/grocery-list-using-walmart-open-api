import React, { useState, useEffect } from "react";
import Button from "./Styles/Button";
import { postRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import { navigate } from "@reach/router";
import Loader from "./Loader";

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
  const uploadImage = e => {
    if (!file) {
      return null;
    }
    e.preventDefault();
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
    <div>
      <div className="list-items">
        <div className="recipe-image">
          {load ? <img src={image} id="r-image" alt="recipe" /> : <Loader />}
        </div>
        <br />
        <div
          style={{
            display: "inline-block",
            position: "relative",
            maxWidth: "40%",
            minWidth: "38%"
          }}
        >
          <label>Recipe Name</label>
          <br />
          <input
            style={{ width: "100%" }}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <label>Instructions</label>
          <br />
          <textarea
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            position: "relative",
            maxWidth: "40%",
            minWidth: "38%",
            verticalAlign: "top"
          }}
        >
          <label>Select Ingredient From History</label>
          <br />
          <select
            type="number"
            value={select}
            onChange={e => setSelect(parseInt(e.target.value))}
            style={{ width: "100%" }}
          >
            <option />
            {props.history.map(el => {
              return (
                <option type="number" key={el.id} value={el.id}>
                  {el.title}
                </option>
              );
            })}
          </select>
          <br />
          <input
            type="text"
            value={measure}
            onChange={e => setMeasure(e.target.value)}
            placeholder="Amount Required (ex. cups, oz)"
            style={{ width: "100%" }}
          />
          <button
            onClick={() => {
              setIngredients([
                ...ingredients,
                { items: select, measure: measure }
              ]);
              setMeasure("");
            }}
          >
            Add to Recipe
          </button>
          <form onSubmit={uploadImage}>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={e => {
                setFile(e.target.files[0]);
              }}
            />
            <button type="submit">Use Photo</button>
          </form>
        </div>
        {show.map(el => {
          return (
            <div id="list-block" style={{ margin: 0, padding: 0 }}>
              <img
                style={{ height: 25, width: 25, margin: 10 }}
                src={el.image}
                alt={el.title}
              />
              <h4 style={{ marginLeft: 30 }}>{el.title}</h4>
              <p>{el.measure}</p>
            </div>
          );
        })}
        <br />

        <Button label="Save Recipe" click={handleSubmit} />
      </div>
    </div>
  );
}
