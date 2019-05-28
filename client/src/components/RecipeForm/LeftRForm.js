import React from "react";
import Loader from "../Utility/Loader";
import Input from "../Forms/Input";

export default function LeftRForm(props) {
  return (
    <div
      className="r-form-container"
      style={{ maxWidth: props.device ? "98%" : "40%" }}
    >
      <div className="recipe-image">
        {props.load ? (
          <img src={props.image} id="r-image" alt="recipe" />
        ) : (
          <Loader />
        )}
      </div>
      <label className="photo-button" htmlFor="file">
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
        className="cust-select"
        type="text"
        value={props.select}
        onChange={props.changeSelect}
        style={{ width: "100%" }}
      >
        <option />
        {props.history.map(el => {
          return (
            <option type="text" key={el._id} value={el._id}>
              {el.title}
            </option>
          );
        })}
      </select>
      <div style={{ display: "inline-block", boxSizing: "border-box" }}>
        <Input
          type={"text"}
          name="amount"
          handleChange={props.changeMeasure}
          value={props.measure}
          width={"100%"}
          labelName={"amount"}
          validation={false}
        />
      </div>
      <button onClick={props.submit}>Add Ingredient</button>
      <label>Ingredients:</label>
      {props.lists}
    </div>
  );
}
