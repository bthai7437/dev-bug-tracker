import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as actionTypes from "./actionTypes";

const ProjectForm = props => {
  let [projName, setProjName] = useState("");
  let [projType, setProjType] = useState("Scrum");
  let [projLeader, setProjLeader] = useState("");
  let [projTeam, setProjTeam] = useState([]);
  let [projFront, setProjFront] = useState("");
  let [projBack, setProjBack] = useState("");
  let [projData, setProjData] = useState("");
  let [counter, setCounter] = useState(0);
  let [memberName, setMemberName] = useState("");
  const submitButtonStyle = {
    marginTop: "10%",
    width: "20%",
    float: "right",
    fontSize: "150%"
  };

  const onTypeHandler = event => {
    const val = event.target.value;
    setProjType(val);
  };

  const onChangeHandler = (event, type) => {
    const value = event.target.value;
    switch (type) {
      case actionTypes.PROJECT_NAME:
        setProjName(value);
        break;
      case actionTypes.PROJECT_TYPE:
        setProjType(value);
        break;
      case actionTypes.PROJECT_LEADER:
        setProjLeader(value);
        break;
      case actionTypes.PROJECT_TEAM:
        setMemberName(value);
        break;
      case actionTypes.PROJECT_FRONT:
        setProjFront(value);
        break;
      case actionTypes.PROJECT_BACK:
        setProjBack(value);
        break;
      case actionTypes.PROJECT_DATA:
        setProjData(value);
        break;
      default:
    }
  };

  const addMemberHandler = event => {
    setProjTeam([...projTeam, { id: counter, name: memberName }]);
    setCounter(counter + 1);
  };

  let listOfMembers = projTeam.map(member => {
    return (
      <Col
        md={2}
        key={member.id}
        style={{ border: "1px solid ", marginRight: "1%", marginTop: "1%" }}
      >
        {member.name}
      </Col>
    );
  });
  const onSubmitHandler = event => {
    const project = {
      title: projName,
      type: projType,
      leader: projLeader,
      team: projTeam,
      front: projFront,
      back: projBack,
      data: projData
    };
    event.preventDefault();
    fetch("https://bug-tracker-fff15.firebaseio.com/projects.json", {
      method: "POST",
      body: JSON.stringify(project),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div style={{ paddingLeft: "5%", paddingTop: "5%" }}>
      <h1>Add Project Form</h1>
      <Form>
        <Form.Group controlId={actionTypes.PROJECT_NAME}>
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Project Name"
            onChange={event => onChangeHandler(event, actionTypes.PROJECT_NAME)}
          />
        </Form.Group>
        <Form.Group controlId={actionTypes.PROJECT_TYPE}>
          <Form.Label>Project Type</Form.Label>
          <Form.Control as="select" onClick={onTypeHandler}>
            <option>Scrum</option>
            <option>Kanban</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId={actionTypes.PROJECT_LEADER}>
          <Form.Label>Project Leader</Form.Label>
          <Form.Control
            type="text"
            placeholder="Leader Name"
            onChange={event =>
              onChangeHandler(event, actionTypes.PROJECT_LEADER)
            }
          />
        </Form.Group>
        <Form.Group controlId={actionTypes.PROJECT_TEAM}>
          <Form.Label>Project Team</Form.Label>

          <Form.Control
            type="text"
            placeholder="Team Member Name"
            onChange={event => onChangeHandler(event, actionTypes.PROJECT_TEAM)}
          />
          <Button
            onClick={addMemberHandler}
            style={{ marginTop: "1%", float: "left" }}
          >
            Add Member
          </Button>
          <Row style={{ padding: "2%" }}>{listOfMembers}</Row>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId={actionTypes.PROJECT_FRONT}>
            <Form.Label>Front End</Form.Label>
            <Form.Control
              placeholder="React, Angular, Vue.."
              onChange={event =>
                onChangeHandler(event, actionTypes.PROJECT_FRONT)
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId={actionTypes.PROJECT_BACK}>
            <Form.Label>Back End</Form.Label>
            <Form.Control
              placeholder="Node, PHP, Ruby, ..."
              onChange={event =>
                onChangeHandler(event, actionTypes.PROJECT_BACK)
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId={actionTypes.PROJECT_DATA}>
            <Form.Label>Database</Form.Label>
            <Form.Control
              placeholder="MySQL, Postgres, MongoDB, ..."
              onChange={event =>
                onChangeHandler(event, actionTypes.PROJECT_DATA)
              }
            />
          </Form.Group>
        </Form.Row>
        <Button block style={submitButtonStyle} onClick={onSubmitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProjectForm;
