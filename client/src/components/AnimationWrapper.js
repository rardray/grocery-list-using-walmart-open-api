import React, { useEffect, useState } from "react";

export default function AnimationWrapper(props) {
  const [animation, setAnimation] = useState({
    width: "40%",
    transform: "translateY(400px)",
    opacity: 0,
    transition: "0.4s ease-in-out",
    margin: "auto"
  });
  const newAnimation = {
    width: "100%",
    transform: "translateY(0px)",
    opacity: 1,
    transition: "0.4s ease-in-out",
    margin: "auto"
  };
  const anim = () => {
    setAnimation(() => newAnimation);
  };
  useEffect(() => {
    setTimeout(anim, 0);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%"
      }}
    >
      <div style={animation}>{props.children}</div>
    </div>
  );
}
