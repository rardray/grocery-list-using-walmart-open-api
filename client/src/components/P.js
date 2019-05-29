import React, { useContext } from "react";
import ThemesContext from "./contextComponents/themes.context";

export default function P(props) {
  const { theme } = useContext(ThemesContext);
  return (
    <p
      className={props.class}
      style={{
        whiteSpace: props.whiteSpace,
        marginLeft: props.margin,
        color: theme.secondaryText
      }}
    >
      {props.children}
    </p>
  );
}
