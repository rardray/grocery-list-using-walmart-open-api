import React, { useContext } from "react";
import ThemeContext from "./contextComponents/themes.context";
import BoxContainer from "./BoxContainer";
import ListWrapper from "./ListPages/SharedStateless/ListWrapper";
import H2Blue from "./H2Blue";

export default function Settings(props) {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <ListWrapper header="Settings">
      <BoxContainer>
        <H2Blue label="Theme" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexFlow: "row wrap"
          }}
        >
          <div style={{ display: "inline-block", position: "relative" }}>
            <label>Default</label>
            <br />
            <input
              name="theme"
              type="radio"
              value="default"
              onChange={e => changeTheme(e.target.value)}
            />
          </div>
          <div style={{ display: "inline-block", position: "relative" }}>
            <label>Dark</label>
            <br />
            <input
              name="theme"
              type="radio"
              value="dark"
              onChange={e => changeTheme(e.target.value)}
            />
          </div>
        </div>
      </BoxContainer>
    </ListWrapper>
  );
}
