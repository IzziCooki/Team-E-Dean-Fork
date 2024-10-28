import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Col } from "react-bootstrap";
//import { Link } from 'react-router-dom'; //might be useful later
import { useNavigate } from "react-router-dom";
import "./../App.css";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="primary"
              size="small"
            >
              Register
            </Button>
          </div>
        </header>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-panel2"></div>
      <div className="App-panel">
        <Col>
          <div className="Column 1" style={{ width: "85%", height: "90%" }}>
            <img
              src={logo2}
              className="App-logo3"
              alt="logo"
              object-fit="fill"
            />
          </div>
        </Col>
        <Col>
          <div
            className="column2"
            style={{
              position: "absolute",
              right: "0",
              bottom: "23%",
              width: "20%",
            }}
          >
            <p className="App-SignIn">Sign In</p>
            <label>
              Email: <input name="My Input" />
            </label>
            <label>
              Password: <input name="My Input" />
            </label>
            <p> </p>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="primary"
            >
              Sign In
            </Button>
          </div>
        </Col>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;
