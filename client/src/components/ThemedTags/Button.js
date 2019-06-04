import React, { useState, useContext } from "react";
import ThemesContext from "../contextComponents/themes.context";

export default function Button(props) {
  const [hover, setHover] = useState(false);
  const { theme } = useContext(ThemesContext);
  return (
    <button
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={props.class}
      onClick={props.click}
      style={{
        cursor: props.disabled ? "default" : "pointer",
        background: props.disabled
          ? theme.secondaryBgColor
          : hover
          ? theme.secondaryText
          : theme.primaryColor,
        color: theme.mainText,
        transition: "0.3s ease-in-out"
      }}
    >
      {props.label}
    </button>
  );
}
