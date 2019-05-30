import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function BoxContainer(props) {
  const { additionalStyles } = props;
  const { theme } = useContext(ThemesContext);
  return (
    <div style={additionalStyles}>
      <div
        className={props.class}
        style={{
          display: "block",
          position: "relative",
          boxSizing: "border-box",
          width: "100%",
          background: theme.mainBgColor,
          margin: "0px 0 25px 0",
          padding: 10,
          textAlign: "center",
          boxShadow: "0px 2px 4px #0c3450",
          transition: "background .3s ease-in-out"
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
