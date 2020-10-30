import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { Button } from "react-bootstrap";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";

const CompleteButton = props => {
  const [showModal, setModal] = useState(false);
  const spring = useSpring({
    config: config.gentle,
    transform: "scale(1)",
    from: { transform: "scale(0)" }
  });
  return (
    <animated.div style={spring}>
      <Button onClick={props.issueArchived}>Archive</Button>
    </animated.div>
  );
};

export default CompleteButton;
