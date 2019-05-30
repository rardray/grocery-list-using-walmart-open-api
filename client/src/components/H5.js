import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function H5(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <h5
      className={props.class}
      style={{ color: theme.secondaryText, transition: ".3s ease-in-out" }}
    >
      {props.label}
    </h5>
  );
}
