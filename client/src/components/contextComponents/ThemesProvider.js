import React, { useState } from "react";
import ThemesContext from "./themes.context";

const ThemesProvider = ({ children }) => {
  const changeTheme = data => {
    if (data === "dark") {
      setTheme(prevTheme => {
        return { ...prevTheme, title: "dark", theme: { ...dark } };
      });
    } else if (data === "desert") {
      setTheme(prevTheme => {
        return { ...prevTheme, title: "desert", theme: { ...desert } };
      });
    } else {
      setTheme({ ...defaultTheme });
    }
  };
  const dark = {
    primaryColor: "#00121f",
    secondaryColor: "#0c3450",
    mainText: "white",
    secondaryText: "lightgrey",
    tertiaryText: "lightgrey",
    mainBgColor: "#152633",
    secondaryBgColor: "black",
    tertiaryBgColor: "#8fa8e4"
  };
  const desert = {
    primaryColor: "#861320",
    secondaryColor: "#775a43",
    mainText: "white",
    secondaryText: "#4a070f",
    tertiaryText: "#861320",
    mainBgColor: "#fff2e8",
    secondaryBgColor: "#f7d6bc",
    tertiaryBgColor: "#4a070f"
  };
  const defaultTheme = {
    title: "default",
    theme: {
      primaryColor: "#377fbb",
      secondaryColor: "#dc5c36",
      mainText: "white",
      secondaryText: "#0c3450",
      tertiaryText: "#377fbb",
      mainBgColor: "white",
      secondaryBgColor: "#dceaf5",
      tertiaryBgColor: "#0c3450"
    },
    changeTheme
  };
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemesContext.Provider value={theme}>{children}</ThemesContext.Provider>
  );
};

export default ThemesProvider;

/* 
#775a43
#861320
#f7d6bc
*/
