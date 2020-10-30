import React, { useState } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import IssueButtons from "../../UI/Buttons/IssueButtons/issueButtons";
import CompleteButton from "../../UI/Buttons/CompleteButton/completeButton";

const Issue = props => {
  const [isArchived, setArchived] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const projectId = props.match.params.id;
  const issueId = props.id;

  const onIssueSelected = () => {
    setVisibleButton(!visibleButton);
  };

  const onIssueDeleted = () => {
    fetch(
      `https://bug-tracker-fff15.firebaseio.com/projects/${projectId}/issues/${issueId}.json`,
      {
        method: "DELETE"
      }
    )
      .then(res => {
        res.json();
        setDeleted(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onIssueCompleted = (title, type, desc) => {
    const completedIssue = {
      title: title,
      type: type,
      desc: desc
    };
    fetch(
      `https://bug-tracker-fff15.firebaseio.com/projects/${projectId}/completed.json`,
      {
        method: "POST",
        body: JSON.stringify(completedIssue),
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        onIssueDeleted();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onIssueEdited = () => {
    props.history.push(`/project/${projectId}/${issueId}`);
  };
  let urgentStar = null;

  if (props.type === "Urgent") {
    urgentStar = (
      <FontAwesomeIcon icon={faStar} style={{ paddingRight: "1%" }} />
    );
  }

  const onIssueArchived = () => {
    fetch(
      `https://bug-tracker-fff15.firebaseio.com/projects/${projectId}/completed.json`,
      {
        method: "DELETE"
      }
    )
      .then(res => {
        setArchived(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  let buttonType = (
    <IssueButtons
      {...props}
      issueEdited={onIssueEdited}
      issueDeleted={onIssueDeleted}
      issueCompleted={onIssueCompleted}
    />
  );

  if (props.completedStyle) {
    buttonType = (
      <CompleteButton issueArchived={onIssueArchived}> Archive </CompleteButton>
    );
  }
  return (
    <div>
      {isDeleted || isArchived ? null : (
        <ListGroup.Item style={props.completedStyle}>
          <Row style={{ cursor: "pointer" }}>
            <Col xs={7} md={8}>
              <div style={{ paddingTop: "5px" }} onClick={onIssueSelected}>
                {urgentStar}
                {props.title}
              </div>
            </Col>
            <Col xs={3} md={4}>
              {visibleButton ? buttonType : null}
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </div>
  );
};

export default withRouter(Issue);
