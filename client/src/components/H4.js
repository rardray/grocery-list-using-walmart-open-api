import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function H4(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <h4 className={props.class} style={{ color: theme.secondaryText }}>
      {props.label}
    </h4>
  );
}
