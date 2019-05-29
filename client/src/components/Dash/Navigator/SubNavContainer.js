import React, { useContext } from "react";
import ThemesContext from "../../contextComponents/themes.context";

export default function SubNavContainer(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <div style={{ background: theme.primaryColor }}>{props.children} </div>
  );
}
