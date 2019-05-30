import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function H3(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <h3
      className={props.class}
      style={{ color: theme.secondaryText, transition: ".3s ease-in-out" }}
    >
      {props.label}
    </h3>
  );
}
