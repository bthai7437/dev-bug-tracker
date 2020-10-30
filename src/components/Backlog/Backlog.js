import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

const Backlog = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`https://bug-tracker-fff15.firebaseio.com/projects.json`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const loadedData = [];
        for (let key in data) {
          loadedData.push({
            id: key,
            title: data[key].title,
            issues: data[key].issues
          });
        }
        setProjects(loadedData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const listOfProjects = projects.map(project => {
    const allIssues = [];
    for (let key in project.issues) {
      allIssues.push({
        id: key,
        title: project.issues[key].title,
        type: project.issues[key].type,
        desc: project.issues[key].desc
      });
    }
    const listOfIssues = allIssues.map(issue => {
      return (
        <div key={issue.id} style={{ marginBottom: "1%" }}>
          <ListGroup.Item>{issue.title}</ListGroup.Item>
        </div>
      );
    });

    return (
      <div key={project.id} style={{ paddingTop: "1%" }}>
        <h3>{project.title}</h3>
        <ListGroup>{listOfIssues}</ListGroup>
        <hr style={{ borderTop: "2px solid rgba(0,0,0,.1)" }} />
      </div>
    );
  });
  return (
    <div style={{ height: "100vh" }}>
      <h2>Your backlogs</h2>
      {listOfProjects}
    </div>
  );
};

export default Backlog;
