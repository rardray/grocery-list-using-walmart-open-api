import React, { useContext } from "react";
import ThemesContext from "../contextComponents/themes.context";

export default function H2Blue(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <h2
      className={props.class}
      style={{
        background: theme.primaryColor,
        color: theme.mainText,
        margin: "2px 0 8px 0",
        padding: 6,
        width: "100%",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
        transition: ".3s ease-in-out"
      }}
    >
      {props.label}
    </h2>
  );
}
