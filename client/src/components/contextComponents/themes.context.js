import { createContext } from "react";

const ThemesContext = createContext({
  theme: "",
  changeTheme: () => {}
});

export default ThemesContext;
