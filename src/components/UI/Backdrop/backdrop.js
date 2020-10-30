import React from "react";
import BackdropStyle from "./backdrop.module.css";
const Backdrop = props => {
  return props.show ? (
    <div className={BackdropStyle.backdrop} onClick={props.hamburgClick}></div>
  ) : null;
};

export default Backdrop;
