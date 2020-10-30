import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import { useSpring, animated, config } from "react-spring";
const ProjectCard = props => {
  const [isHovered, setIsHovered] = useState(false);
  const projectDispatch = useDispatch();

  let cardStyle = {
    backgroundColor: "#8884f7",
    opacity: "0.7",
    border: "0px",
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.1) 3px 2px 3px",
    color: "white"
  };

  const onCardClickHandler = () => {
    projectDispatch({
      type: "SET_PROJECT",
      payload: {
        name: props.title,
        type: props.type,
        leader: props.leader,
        team: props.team,
        front: props.front,
        back: props.back,
        data: props.data
      }
    });

    props.history.push("/project/" + props.id);
  };

  if (isHovered) {
    cardStyle = {
      ...cardStyle,
      opacity: "1",
      border: "0px",
      cursor: "pointer",
      color: "white"
    };
  }
  const listOfMembers = props.team.map(member => {
    return (
      <div key={member.id + Math.random()}>
        <Col>[{member.name}]</Col>
      </div>
    );
  });

  const spring = useSpring({
    config: config.gentle,
    transform: "scale(1)",
    from: {
      transform: "scale(0)"
    }
  });

  return (
    <div>
      <animated.div style={spring}>
        <Card
          style={cardStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onCardClickHandler}
        >
          <Card.Body>
            <div style={{ listStyle: "none" }}>
              <div style={{ fontSize: "110%" }}>
                Type: {props.type}
                <div style={{ fontSize: "85%", paddingTop: "1%" }}>
                  Leader: {props.leader}
                </div>
                <Row md={2} style={{ margin: "0px", fontSize: "85%" }}>
                  Team: {listOfMembers}
                </Row>
                <div style={{ paddingTop: "3%" }}>
                  <Row>
                    <Col>Front-End: {props.front}</Col>
                    <Col>Back-End: {props.back}</Col>
                    <Col>Database: {props.data}</Col>
                  </Row>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </animated.div>
    </div>
  );
};

export default ProjectCard;
