import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function Span(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <span
      className={props.class}
      style={{ color: theme.secondaryText, transition: ".3s ease-in-out" }}
    >
      {props.children}
    </span>
  );
}
