import React, { useContext } from "react";
import ThemesContext from "../contextComponents/themes.context";

export default function Label(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <label
      htmlFor={props.label}
      className={props.class}
      style={{ color: theme.tertiaryText, transition: ".3s ease-in-out" }}
    >
      {props.children}
    </label>
  );
}
