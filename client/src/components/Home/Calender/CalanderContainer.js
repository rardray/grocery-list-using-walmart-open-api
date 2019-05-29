import React, { useContext } from "react";
import ThemesContext from "../../contextComponents/themes.context";

export default function CalanderContainer(props) {
  const { theme } = useContext(ThemesContext);
  return <div style={{ color: theme.thirdText }}>{props.children} </div>;
}
