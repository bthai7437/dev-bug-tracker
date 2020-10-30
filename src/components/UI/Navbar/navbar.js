import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SignOutModal from "../Modal/SignOutModal/SignOutModal";
import NavStyle from "./navbar.module.css";
const Navbar = props => {
  let [showModal, setModal] = useState(false);
  let [signout, setSignOut] = useState(false);
  let [buttonSelected, setSelected] = useState("home");

  const logoutDispatch = useDispatch();

  const onSelectHandler = dest => {
    switch (dest) {
      case "backlog":
        props.history.push("/backlog");
        break;
      case "home":
        props.history.push("/");
        break;
      case "signout":
        setModal(true);
        break;
      default:
        console.log("default");
    }
  };

  const onSignout = () => {
    setSignOut(true);
  };

  if (signout) {
    logoutDispatch({
      type: "LOGOUT"
    });
  }
  return (
    <ul
      className={NavStyle.navList}
      style={{ fontSize: "20px", color: "#8884f7" }}
    >
      <li>
        <button
          className={NavStyle.navButton}
          onClick={() => onSelectHandler("home")}
        >
          Home
        </button>
      </li>

      <li>
        <button
          className={NavStyle.navButton}
          onClick={() => onSelectHandler("backlog")}
          style={{ marginTop: "5%" }}
        >
          All Backlogs
        </button>
      </li>

      <li style={{ marginTop: "auto", paddingBottom: "15%" }}>
        <button
          className={NavStyle.navButton}
          onClick={() => onSelectHandler("signout")}
        >
          Sign out
        </button>
      </li>

      <SignOutModal
        show={showModal}
        onHide={() => setModal(false)}
        signout={onSignout}
      />
    </ul>
  );
};

export default withRouter(Navbar);
