import React from 'react'
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Col } from "react-bootstrap";
import "./../App.css";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <Button onClick={() => {}} variant="neutral" size="small">
              Sign in
            </Button>
            <Button onClick={() => {}} variant="primary" size="small">
              Register
            </Button>
          </div>
        </header>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-panel">
        <Col>
          <div className="Column 1" style={{width: "85%", height: "90%"}}>
            <img src={logo2} className="App-logo3" alt="logo" object-fit="fill" />
          </div>
        </Col>
        <Col>
          <div className="column2" style={{position: "absolute", right: "0", bottom: "50%", width: "20%"}}>
              <label>
                Email: <input name="My Input"/>
              </label>
              <label>
                Password: <input name="My Input"/>
              </label>
          </div>
        </Col>  
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;
