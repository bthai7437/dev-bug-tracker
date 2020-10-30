import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SideDrawerStyle from "./sideDrawer.module.css";
import SignOutModal from "../Modal/SignOutModal/SignOutModal";
import { withRouter } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";

const SideDrawer = props => {
  let [showModal, setModal] = useState(false);
  let [signout, setSignOut] = useState(false);

  const logoutDispatch = useDispatch();

  const spring = useSpring({
    config: config.gentle,
    transform: "translateX(0)",
    from: { transform: "translateX(100%)" }
  });

  const expand = useSpring({
    config: config.gentle,
    transform: "translateX(100%)",
    from: { transform: "translateX(0)" }
  });

  const onSignout = () => {
    setSignOut(true);
  };

  if (signout) {
    logoutDispatch({
      type: "LOGOUT"
    });
  }

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

  let drawerClosed = (
    <div
      style={{ width: "35px", marginBottom: "2%" }}
      onClick={props.hamburgClick}
    >
      <div className={SideDrawerStyle.hamburger}></div>
      <div className={SideDrawerStyle.hamburger}></div>
      <div
        className={SideDrawerStyle.hamburger}
        style={{ marginBottom: "5%" }}
      ></div>
    </div>
  );

  let drawerOpened = (
    <div className={SideDrawerStyle.drawer}>
      <ul
        className={SideDrawerStyle.navList}
        style={{ fontSize: "20px", color: "#8884f7" }}
      >
        <li style={{ paddingTop: "5%" }}>
          <button
            className={SideDrawerStyle.navButton}
            onClick={() => onSelectHandler("home")}
          >
            Home
          </button>
        </li>

        <li>
          <button
            className={SideDrawerStyle.navButton}
            onClick={() => onSelectHandler("backlog")}
            style={{ marginTop: "5%" }}
          >
            All Backlogs
          </button>
        </li>

        <li style={{ marginTop: "auto", paddingBottom: "10%" }}>
          <button
            className={SideDrawerStyle.navButton}
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
    </div>
  );
  return (
    <animated.div>
      <div>{props.isOpen ? drawerOpened : drawerClosed}</div>
    </animated.div>
  );
};

export default withRouter(SideDrawer);
