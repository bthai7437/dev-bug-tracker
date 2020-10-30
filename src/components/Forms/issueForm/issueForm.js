import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import * as actionTypes from "./actionTypes";
import { withRouter } from "react-router-dom";

const IssueForm = props => {
  const [issueName, setIssueName] = useState("");
  const [issueType, setIssueType] = useState("Minor");
  const [issueDesc, setIssueDesc] = useState("");
  const [isEditMode, setEditmode] = useState(false);
  const addIssueDispatch = useDispatch();

  useEffect(() => {
    const projectId = props.match.params.id;
    const issueId = props.match.params.issue;
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (issueId) {
      fetch(
        `https://bug-tracker-fff15.firebaseio.com/projects/${projectId}/issues/${issueId}.json`,
        { signal: signal }
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          setEditmode(true);
          setIssueName(data.title);
          setIssueType(data.type);
          setIssueDesc(data.desc);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props.match.params.id, props.match.params.issue]);

  const onChangeHandler = (event, type) => {
    const value = event.target.value;
    switch (type) {
      case actionTypes.ISSUE_NAME:
        setIssueName(value);
        break;
      case actionTypes.ISSUE_TYPE:
        setIssueType(value);
        break;
      case actionTypes.ISSUE_DESC:
        setIssueDesc(value);
        break;
      default:
    }
  };

  const onTypeHandler = event => {
    const val = event.target.value;
    setIssueType(val);
  };

  const onSubmitHandler = event => {
    const issue = {
      title: issueName,
      type: issueType,
      desc: issueDesc
    };

    const loadedIssues = [];
    for (const key in props.issues) {
      loadedIssues.push({
        title: props.issues[key].title,
        type: props.issues[key].type,
        desc: props.issues[key].desc
      });
    }
    loadedIssues.push(issue);

    event.preventDefault();
    if (isEditMode) {
      fetch(
        `https://bug-tracker-fff15.firebaseio.com/projects/${props.match.params.id}/issues/${props.match.params.issue}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(issue),
          headers: { "Content-Type": "application/json" }
        }
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          addIssueDispatch({
            type: "UPDATE_ISSUE",
            issues: loadedIssues
          });
          props.history.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch(
        `https://bug-tracker-fff15.firebaseio.com/projects/${props.match.params.id}/issues.json`,
        {
          method: "POST",
          body: JSON.stringify(issue),
          headers: { "Content-Type": "application/json" }
        }
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          addIssueDispatch({
            type: "ADD_ISSUE",
            issues: loadedIssues
          });
          props.history.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>Add Issue Form</h1>
      <Form>
        <Form.Group controlId={actionTypes.ISSUE_NAME}>
          <Form.Label>Name of Issue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Issue Name"
            onChange={event => onChangeHandler(event, actionTypes.ISSUE_NAME)}
            value={issueName}
          />
        </Form.Group>
        <Form.Group controlId={actionTypes.ISSUE_TYPE}>
          <Form.Label>Type of Issue</Form.Label>
          <Form.Control as="select" onChange={onTypeHandler} value={issueType}>
            <option>Minor</option>
            <option>Urgent</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId={actionTypes.ISSUE_DESC}>
          <Form.Label>Description of issue</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            onChange={event => onChangeHandler(event, actionTypes.ISSUE_DESC)}
            value={issueDesc}
          />
        </Form.Group>
        <Button style={{ float: "right" }} onClick={onSubmitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(IssueForm);
