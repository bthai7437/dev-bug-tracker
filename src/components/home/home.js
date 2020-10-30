import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HomeBar from "../UI/Homebar/homebar";
import Projects from "../projects/projects";
import { useSelector } from "react-redux";

function Home(props) {
  const user = useSelector(state => state.userReducer.user);
  return (
    <div>
      <HomeBar />
      <h1 style={{ textAlign: "center", paddingTop: "2%" }}>
        Welcome Back {user} !
      </h1>
      <Projects />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(Home));
