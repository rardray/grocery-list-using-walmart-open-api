import React, { useContext } from "react";
import ThemeContext from "./contextComponents/themes.context";
import BoxContainer from "./BoxContainer";
import ListWrapper from "./ListPages/SharedStateless/ListWrapper";
import H2Blue from "./H2Blue";
import Label from "./Label";

export default function Settings(props) {
  const { title, theme, changeTheme } = useContext(ThemeContext);

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
            <Label>Default</Label>
            <br />
            <input
              name="theme"
              checked={title === "default" ? true : false}
              type="radio"
              value="default"
              onChange={e => changeTheme(e.target.value)}
            />
          </div>
          <div style={{ display: "inline-block", position: "relative" }}>
            <Label>Dark</Label>
            <br />
            <input
              name="theme"
              checked={title === "dark" ? true : false}
              type="radio"
              value="dark"
              onChange={e => changeTheme(e.target.value)}
            />
          </div>
          <div style={{ display: "inline-block", position: "relative" }}>
            <Label>Desert</Label>
            <br />
            <input
              name="theme"
              checked={title === "desert" ? true : false}
              type="radio"
              value="desert"
              onChange={e => changeTheme(e.target.value)}
            />
          </div>
        </div>
      </BoxContainer>
    </ListWrapper>
  );
}
