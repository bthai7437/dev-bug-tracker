import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { Button } from "react-bootstrap";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";

const IssueButtons = props => {
  const [showModal, setModal] = useState(false);
  const spring = useSpring({
    config: config.gentle,
    transform: "scale(1)",
    from: { transform: "scale(0)" }
  });

  const title = props.title;
  const type = props.type;
  const desc = props.desc;

  return (
    <animated.div style={spring}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="danger" onClick={() => setModal(true)}>
          Delete
        </Button>

        <Button onClick={props.issueEdited}> Edit</Button>
        <Button
          onClick={() => props.issueCompleted(title, type, desc)}
          variant="success"
        >
          Completed
        </Button>

        <DeleteModal
          show={showModal}
          onHide={() => setModal(false)}
          deleteclick={props.issueDeleted}
          title={props.title}
        />
      </div>
    </animated.div>
  );
};

export default IssueButtons;
