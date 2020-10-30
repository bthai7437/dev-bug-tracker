import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoginStyle from "./login.module.css";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Login(props) {
  let [username, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [inputUser, setInputUser] = useState("");
  let [inputPass, setInputPass] = useState("");
  let [isLoaded, setLoaded] = useState(false);
  let [hasTouchedUser, setTouchUser] = useState(false);
  let [hasTouchedPass, setTouchPass] = useState(false);
  let [isAuth, setAuth] = useState(true);
  const loginDispatch = useDispatch();

  const onHookLogin = (username, password) => {
    loginDispatch({
      type: "AUTHENTICATE_APPROVE",
      user: username,
      pass: password,
      auth: true
    });
  };

  let inputStyle = null;

  //error msg
  const userError = (
    <Form.Label className={LoginStyle.userErr}>
      Username and Password don't match
    </Form.Label>
  );

  const onLoginSubmitHandler = event => {
    event.preventDefault();
    fetch(`https://bug-tracker-fff15.firebaseio.com/users.json`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setUser(data.username);
        setPassword(data.password);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoaded) {
    if (username === inputUser && password === inputPass) {
      onHookLogin(username, password);
      setLoaded(false);
    } else {
      setAuth(false);
      setLoaded(false);
    }
  }

  const onChangeHandler = event => {
    let id = event.target.id;
    if (!isAuth) {
      setAuth(true);
    }
    if (id === "formUser") {
      setInputUser(event.target.value);
    }
    if (id === "formPass") {
      setInputPass(event.target.value);
    }
  };

  if (hasTouchedUser && hasTouchedPass) {
    if (inputUser.length === 0) {
      inputStyle = { border: "1px red solid" };
    } else {
      inputStyle = null;
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", paddingTop: "5%" }}>Dev Bug Tracker</h1>
      <div className={LoginStyle.Login}>
        <Form style={{ padding: "5%" }}>
          <Form.Group controlId="formUser">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={onChangeHandler.bind(this)}
              value={inputUser}
              onSelect={() => {
                setTouchUser(true);
              }}
              style={inputStyle}
            />
            {inputStyle ? (
              <Form.Label className={LoginStyle.UserErr}>
                Please enter a username
              </Form.Label>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formPass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Password"
              onChange={onChangeHandler.bind(this)}
              value={inputPass}
              onSelect={() => {
                setTouchPass(true);
              }}
            />
          </Form.Group>
          <Form.Group style={{ textAlign: "center", marginTop: "5%" }}>
            <button
              className={LoginStyle.btnPrimary}
              onClick={onLoginSubmitHandler.bind(this)}
            >
              Login
            </button>
            <button
              style={{ float: "right" }}
              className={LoginStyle.btnPrimary}
              onClick={() => onHookLogin("guest", "guest")}
            >
              Login as Guest
            </button>
          </Form.Group>
          {isAuth ? null : userError}
        </Form>
      </div>
    </div>
  );
}

export default withRouter(Login);
