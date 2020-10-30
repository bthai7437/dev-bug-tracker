import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import BacklogStyle from "./backlog.module.css";
import Issues from "../../../Issues/issues";
import CompleteLog from "../CompleteLog/completeLog";
import LoadingSpinner from "../../../UI/Spinner/spinner";

const Backlog = props => {
  const [completeSelected, setCompleteSelected] = useState("backlog");
  const [allIssues, setAllIssues] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(
      `https://bug-tracker-fff15.firebaseio.com/projects/${props.match.params.id}/issues.json`,
      { signal: signal }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        const loadedIssues = [];
        for (const key in data) {
          loadedIssues.push({
            id: key,
            title: data[key].title,
            type: data[key].type,
            desc: data[key].desc
          });
        }
        setLoading(false);
        setAllIssues(loadedIssues);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      abortController.abort();
    };
  }, [props.match.params.id]);

  const onAddIssueHandler = () => {
    props.history.push("/project/" + props.match.params.id + "/add-issue");
  };

  const onCompleteHandler = () => {
    setCompleteSelected("complete");
  };

  const onBacklogHandler = () => {
    setCompleteSelected("backlog");
  };
  const project = useSelector(state => state.projectReducer);

  return (
    <div>
      <Nav
        variant="pills"
        defaultActiveKey="backlog"
        className={BacklogStyle.Nav}
      >
        <Nav.Item>
          <Nav.Link eventKey="backlog" onClick={onBacklogHandler}>
            Backlog
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="complete" onClick={onCompleteHandler}>
            Completed
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="issue" onClick={onAddIssueHandler}>
            Create Issue
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1 className={BacklogStyle.title}>{project.name}</h1>
          <div>
            {completeSelected === "backlog" ? (
              <Issues allIssues={allIssues} />
            ) : (
              <CompleteLog projectId={props.match.params.id} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Backlog;
