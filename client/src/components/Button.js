import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function Button(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <button
      className={props.class}
      onClick={props.click}
      style={{
        background: theme.primaryColor,
        color: theme.mainText
      }}
    >
      {props.label}
    </button>
  );
}
