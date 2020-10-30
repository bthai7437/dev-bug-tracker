import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const homebar = props => {
  const addProjectHandler = () => {
    props.history.push("/add-project");
  };
  const HomeBarStyle = {
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)"
  };
  const NavItemStyle = {
    color: "#8884f7"
  };
  return (
    <div>
      <Navbar style={HomeBarStyle}>
        <Navbar.Brand style={NavItemStyle}>Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            eventKey="addProject"
            onSelect={addProjectHandler}
            style={NavItemStyle}
          >
            Add Project
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default withRouter(homebar);
