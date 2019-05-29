import React, { useContext } from "react";
import ThemesContext from "../contextComponents/themes.context";

export default function HomeContainer(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <div
      className="home"
      style={{
        width: props.device ? "100%" : null,
        background: theme.mainBgColor
      }}
    >
      <div style={{ textAlign: "left" }} />
      {props.children}
    </div>
  );
}
