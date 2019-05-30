import React, { useContext } from "react";
import ThemesContext from "../../contextComponents/themes.context";

export default function LinkWrap(props) {
  const { theme } = useContext(ThemesContext);
  return <div style={{ color: theme.secondaryText }}>{props.children}</div>;
}
