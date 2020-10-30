import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Project from "./project/project";
import { withRouter } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../UI/Spinner/spinner";
import { useSpring, animated, config } from "react-spring";

const Projects = props => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilterProjects] = useState([]);
  const [isFilter, setFilter] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://bug-tracker-fff15.firebaseio.com/projects.json")
      .then(res => {
        return res.json();
      })
      .then(resData => {
        const loadedProjects = [];
        for (const key in resData) {
          loadedProjects.push({
            id: key,
            title: resData[key].title,
            type: resData[key].type,
            leader: resData[key].leader,
            team: resData[key].team,
            front: resData[key].front,
            back: resData[key].back,
            data: resData[key].data
          });
        }
        setLoading(true);
        setAllProjects(loadedProjects);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onFilterHandler = event => {
    const searchItem = event.target.value;
    if (searchItem !== "") {
      let filteredProjects = [...allProjects];
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().startsWith(searchItem.toLowerCase())
      );
      setFilterProjects(filteredProjects);
      setFilter(true);
    } else {
      setFilterProjects([]);
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

  const listOfAllProjects = allProjects.map(project => {
    return (
      <animated.div style={spring} key={project.id}>
        <div style={{ paddingTop: "1%" }}>
          <Project
            id={project.id}
            title={project.title}
            leader={project.leader}
            type={project.type}
            team={project.team}
            front={project.front}
            back={project.back}
            data={project.data}
          />
        </div>
      </animated.div>
    );
  });

  const listOfFilteredProjects = filteredProjects.map(project => {
    return (
      <animated.div style={filterSpring} key={project.id}>
        <div style={{ paddingTop: "1%" }}>
          <Project
            id={project.id}
            title={project.title}
            leader={project.leader}
            type={project.type}
            team={project.team}
            front={project.front}
            back={project.back}
            data={project.data}
          />
        </div>
      </animated.div>
    );
  });

  return (
    <div>
      {!isLoading ? (
        <LoadingSpinner name="Projects" />
      ) : (
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
                  display: "inline-block"
                }}
                onChange={onFilterHandler}
              />
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </Form>
          <div>{isFilter ? listOfFilteredProjects : listOfAllProjects}</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    name: state.name,
    type: state.type,
    leader: state.leader,
    team: state.team,
    front: state.front,
    back: state.back,
    data: state.data
  };
};

export default withRouter(connect(mapStateToProps)(Projects));
