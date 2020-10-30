import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Auth/Login/login";
import Home from "./components/home/home";
import Backlog from "./components/Backlog/Backlog";
import Layout from "./components/Layout/layout";
import AddProject from "./components/Forms/projectForm/addProject";
import AddIssue from "./components/Forms/issueForm/issueForm";
import ProjectBacklog from "./components/projects/project/backlog/backlog";
import SignUpForm from "./components/Forms/SignUpForm/SignUpForm";
import Footer from "./components/UI/Footer/footer";

function App(props) {
  const authenticated = useSelector(state => state.userReducer.authenticated);
  let routes = <Route path="/" component={Login} />;

  if (authenticated === true) {
    routes = (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-project" exact component={AddProject} />
          <Route path="/backlog" exact component={Backlog} />
          <Route path="/signup" exact component={SignUpForm} />
          <Route path="/project/:id/add-issue" exact component={AddIssue} />
          <Route path="/project/:id/:issue" exact component={AddIssue} />
          <Route path="/project/:id" exact component={ProjectBacklog} />
        </Switch>
      </Layout>
    );
  }

  return (
    <div>
      <div className="App">{routes}</div>

      <Footer />
    </div>
  );
}

export default App;
