import React, { useState } from "react";
import ThemesContext from "./themes.context";

const ThemesProvider = ({ children }) => {
  const changeTheme = data => {
    if (data === "dark") {
      setTheme(prevTheme => {
        return { ...prevTheme, theme: { ...dark } };
      });
    }
  };
  const dark = {
    primaryColor: "#00121f",
    secondaryColor: "#0c3450",
    mainText: "white",
    secondaryText: "lightgrey",
    thirdText: "lightgrey",
    mainBgColor: "#152633",
    secondaryBgColor: "black",
    thirdBgColor: "#8fa8e4"
  };
  const defaultTheme = {
    theme: {
      primaryColor: "#377fbb",
      secondaryColor: "#dc5c36",
      mainText: "white",
      secondaryText: "#0c3450",
      thirdText: "#377fbb",
      mainBgColor: "white",
      secondaryBgColor: "#dceaf5",
      thirdBgColor: "#0c3450"
    },
    changeTheme
  };
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemesContext.Provider value={theme}>{children}</ThemesContext.Provider>
  );
};

export default ThemesProvider;
