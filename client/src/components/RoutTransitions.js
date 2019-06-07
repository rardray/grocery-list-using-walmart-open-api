import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";

const defaultStyle = {
  transition: "opacity 20000ms ease-in-out",
  opacity: 1
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 0 },
  exiting: { opacity: 1 },
  exited: { opacity: 1 }
};

export default function RouteTransitions(props) {
  return (
    <Transition in={props.inProp} timeout={2000}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {props.children}
        </div>
      )}
    </Transition>
  );
}
