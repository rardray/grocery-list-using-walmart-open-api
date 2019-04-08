import React from "react";
import Loader from "../Loader";

export default function LeftRForm(props) {
  return (
    <div
      className="r-form-container"
      style={props.window ? { width: "100%" } : null}
    >
      <div className="recipe-image">
        {props.load ? (
          <img src={props.image} id="r-image" alt="recipe" />
        ) : (
          <Loader />
        )}
      </div>
      <label className="photo-button" for="file">
        Choose Photo
      </label>
      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        onChange={props.changeFile}
      />{" "}
      <br />
      <label>Select Ingredient From History</label>
      <br />
      <select
        type="number"
        value={props.select}
        onChange={props.changeSelect}
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
      <label>Amount</label>
      <br />
      <input
        type="text"
        value={props.measure}
        onChange={props.changeMeasure}
        placeholder="Amount Required (ex. cups, oz)"
        className="small-input"
      />
      <button onClick={props.submit}>Add Ingredient</button>
      <br />
      <label>Ingredients:</label>
      {props.lists}
    </div>
  );
}
