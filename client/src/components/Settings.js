import React, { useContext, useState, useEffect } from "react";
import cookie from "react-cookies";
import { putRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import ThemeContext from "./contextComponents/themes.context";
import BoxContainer from "./BoxContainer";
import ListWrapper from "./ListPages/SharedStateless/ListWrapper";
import H2Blue from "./ThemedTags/H2Blue";
import Label from "./ThemedTags/Label";
import Button from "./ThemedTags/Button";

export default function Settings(props) {
  const { title, changeTheme } = useContext(ThemeContext);
  const [message, setMessage] = useState("");

  const saveTheme = () => {
    putRequest(
      `/api/user/${props.user._id}`,
      apiToken(),
      { theme: title },
      data => {
        cookie.save(
          "user",
          { ...props.user, theme: data.data.profile.theme },
          { path: "/" }
        );
      },
      null,
      () => setMessage("Theme Saved")
    );
  };

  useEffect(() => {
    let user = cookie.load("user");
    if (user && title !== user.theme) {
      setMessage(() => "");
    }
  });
  let labels = ["default", "dark", "desert"];
  return (
    <ListWrapper header="Settings">
      <BoxContainer>
        <H2Blue label="profile" />
      </BoxContainer>
      <BoxContainer>
        <H2Blue label="Theme" />
        <h3 style={{ color: "green", height: 25 }}>{message}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexFlow: "row wrap"
          }}
        >
          {labels.map((el, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "inline-block",
                  position: "relative"
                }}
              >
                <Label>{el.charAt(0).toUpperCase() + el.slice(1)}</Label>
                <br />
                <input
                  name="theme"
                  checked={title === el ? true : false}
                  type="radio"
                  value={el}
                  onChange={e => changeTheme(e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <br />
        <Button
          label={"Save Theme"}
          click={saveTheme}
          class={"button-blue-full"}
        />
      </BoxContainer>
    </ListWrapper>
  );
}
