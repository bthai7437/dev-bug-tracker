import React, { useState } from "react";
import { ListGroup, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import Issue from "./Issue/issue";
import { useSpring, animated, config } from "react-spring";

const Issues = props => {
  const [filteredIssues, setFilterIssues] = useState([]);
  const [isFilter, setFilter] = useState(false);

  const onFilterHandler = event => {
    const searchItem = event.target.value;
    if (searchItem !== "") {
      let filteredItems = [...props.allIssues];
      filteredItems = filteredItems.filter(project =>
        project.title.toLowerCase().startsWith(searchItem.toLowerCase())
      );
      setFilterIssues(filteredItems);
      setFilter(true);
    } else {
      setFilterIssues([]);
      setFilter(false);
    }
  };

  const spring = useSpring({
    config: config.gentle,
    transform: "translateX(0)",
    from: { transform: "translateX(100%)" }
  });

  const filterSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });

  let listOfIssues = null;

  if (props.allIssues) {
    listOfIssues = props.allIssues.map(issue => {
      return (
        <animated.div style={spring} key={issue.id}>
          <div style={{ paddingBottom: "1%" }}>
            <Issue
              completedStyle={props.completedStyle}
              onArchive={props.onArchived}
              title={issue.title}
              id={issue.id}
              type={issue.type}
              desc={issue.desc}
            />
          </div>
        </animated.div>
      );
    });
  }

  const listOfFilteredIssues = filteredIssues.map(issue => {
    return (
      <animated.div style={filterSpring} key={issue.id}>
        <div style={{ paddingTop: "1%" }}>
          <Issue
            completedStyle={props.completedStyle}
            title={issue.title}
            id={issue.id}
            type={issue.type}
            desc={issue.desc}
          />
        </div>
      </animated.div>
    );
  });

  return (
    <div>
      <div>
        <Form style={{ paddingTop: "2%" }}>
          <span>
            <FormControl
              type="text"
              placeholder="Search for Projects "
              className="mr-sm-2"
              style={{
                height: "100%",
                width: "30%",
                display: "inline-block",
                marginBottom: "2%"
              }}
              onChange={onFilterHandler}
            />
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </Form>
        <ListGroup>{isFilter ? listOfFilteredIssues : listOfIssues}</ListGroup>
      </div>
    </div>
  );
};

export default withRouter(Issues);
