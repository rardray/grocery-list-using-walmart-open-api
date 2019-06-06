import React, { useContext, useState, useEffect } from "react";
import cookie from "react-cookies";
import { putRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import { Link } from "@reach/router";
import ThemeContext from "./contextComponents/themes.context";
import BoxContainer from "./BoxContainer";
import ListWrapper from "./ListPages/SharedStateless/ListWrapper";
import H2Blue from "./ThemedTags/H2Blue";
import Label from "./ThemedTags/Label";
import Button from "./ThemedTags/Button";
import P from "./ThemedTags/P";
import LinkWrap from "./Home/Daily/LinkWrap";

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
        <H2Blue label="Profile" />
        <div
          style={{
            display: "inline-block",
            position: "relative",
            boxSizing: "border-box",
            width: "50%",
            textAlign: "left",
            padding: "10px 0 10px 0"
          }}
        >
          <P>Name: {props.user.firstName + " " + props.user.lastName}</P>
          <P>{`Email: ${props.user.email}`}</P>
          <LinkWrap>
            <Link to={"/grocery/update"} style={{ color: "inherit" }}>
              Update Info
            </Link>
          </LinkWrap>
          <LinkWrap>
            <Link to={"/grocery/changepassword"} style={{ color: "inherit" }}>
              Change Password
            </Link>
          </LinkWrap>
        </div>
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
                <Label label={"theme"}>
                  {el.charAt(0).toUpperCase() + el.slice(1)}
                </Label>
                <br />
                <input
                  name="theme"
                  id={"theme"}
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
