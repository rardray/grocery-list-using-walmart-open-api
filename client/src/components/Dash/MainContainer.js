import React, { useContext } from "react";
import ThemesContext from "../contextComponents/themes.context";

export default function MainContainer(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <div
      style={{
        background: theme.secondaryBgColor,
        margin: "auto",
        display: "inline-block",
        position: "relative",
        minWidth: "90%",
        width: props.device ? "100%" : props.min,
        textAlign: "center",
        transition: ".3s ease-in-out"
      }}
    >
      {props.children}
    </div>
  );
}
