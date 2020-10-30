import React from "react";
import FooterStyle from "./footer.module.css";
const footerStyle = {
  marginTop: "auto",
  backgroundColor: "#272645",
  color: "#8884f7",
  textAlign: "center",
  margin: "0px"
};
const Footer = () => {
  return (
    <div className={FooterStyle.footer}>
      <h3 style={{ margin: "0px", paddingBottom: "2%" }}>
        Developer Bug Tracker 2020
      </h3>
    </div>
  );
};

export default Footer;
