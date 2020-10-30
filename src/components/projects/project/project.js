import React, { useState } from "react";

import { Row, Col, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ProjectCard from "../../UI/Card/ProjectCard/projectCard";

const Project = props => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  let itemStyle = {
    backgroundColor: "inherit",
    border: "1px solid",
    opacity: "0.7"
  };

  if (isHovered) {
    itemStyle = {
      ...itemStyle,
      backgroundColor: "#ac7dd8",
      opacity: "1",
      color: "white",
      border: "1px solid #ac7dd8"
    };
  }
  const selectedHandler = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div>
      <ListGroup.Item
        style={itemStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={selectedHandler}
      >
        <Row style={{ cursor: "pointer" }}>
          <Col xs={7} md={8}>
            <div
              style={{
                paddingTop: "5px"
              }}
            >
              <h2>{props.title}</h2>
              <hr />
            </div>
          </Col>
        </Row>
        {isSelected ? <ProjectCard {...props} /> : null}
      </ListGroup.Item>
    </div>
  );
};

export default withRouter(Project);
