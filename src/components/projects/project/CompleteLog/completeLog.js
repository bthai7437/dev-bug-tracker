import React, { useState, useEffect } from "react";
import Issues from "../../../Issues/issues";
const CompleteLog = props => {
  const [issues, setIssues] = useState("");
  const completeStyle = { background: "green", color: "white" };

  useEffect(() => {
    fetch(
      `https://bug-tracker-fff15.firebaseio.com/projects/${props.projectId}/completed.json`
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
        setIssues(loadedIssues);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.projectId]);

  return (
    <div>
      <Issues allIssues={issues} completedStyle={completeStyle} />
    </div>
  );
};

export default CompleteLog;
