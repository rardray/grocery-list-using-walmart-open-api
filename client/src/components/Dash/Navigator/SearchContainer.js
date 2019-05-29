import React, { useContext } from "react";
import ThemesContext from "../../contextComponents/themes.context";

export default function SearchContainer(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <div style={{ background: theme.thirdBgColor }}>{props.children} </div>
  );
}
