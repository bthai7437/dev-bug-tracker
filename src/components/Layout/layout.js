import React, { useState } from "react";
import LayoutStyle from "./layout.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../UI/Navbar/navbar";
import SideDrawer from "../UI/SideDrawer/sideDrawer";
import Backdrop from "../UI/Backdrop/backdrop";

function Layout(props) {
  let [toggleMenu, setToggleMenu] = useState(false);
  const onHamburgerClick = () => {
    setToggleMenu(!toggleMenu);
    console.log(toggleMenu);
  };
  return (
    <div className={LayoutStyle.bg}>
      <Backdrop show={toggleMenu} hamburgClick={onHamburgerClick} />
      <Container
        style={{
          margin: "0px",
          paddingTop: "25px",
          maxWidth: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <Row>
          <Col
            md={2}
            style={{
              boxShadow: " rgba(0, 0, 0, 0.2) 1px 1px 1px"
            }}
          >
            <NavBar />
            <SideDrawer hamburgClick={onHamburgerClick} isOpen={toggleMenu} />
          </Col>
          <Col md={9}>
            <main
              style={{
                height: "100vh",
                overflowY: "auto",
                overflowX: "hidden"
              }}
            >
              {props.children}
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
