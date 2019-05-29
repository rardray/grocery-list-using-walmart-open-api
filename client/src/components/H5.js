import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function H5(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <h5 className={props.class} style={{ color: theme.secondaryText }}>
      {props.label}
    </h5>
  );
}
