import { createContext } from "react";

const ThemesContext = createContext({
  title: "",
  theme: "",
  changeTheme: () => {}
});

export default ThemesContext;
