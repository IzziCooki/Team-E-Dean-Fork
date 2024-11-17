import React from 'react'
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from 'react-router-dom';
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
            <Button onClick={() => {navigate('/')}} variant="neutral" size="small">
              Back
            </Button>
          </div>
        </header>
      </div>
      <div className="App-panel6">
        <Row className='Row 1' style={{height: "10%", width: "100%", background: "#fefae0"}}>
          <div className="logo" style={{position: "absolute", left: "25%", top: "0%", height: "20%", width: "100%"}}>
            <img
              src={logo2}
              className="App-logo4"
              alt="logo"
              object-fit="fill"
            />
          </div>
        </Row>
        <Row className='Row 2' style={{position: "absolute", height: "90%", width: "100%", bottom: "0%"}}>
          <p className="App-SignUp" style={{position: "absolute", left: "43%", top: "%", height: "10%", width: "100%"}}>Sign Up Form</p>
            <label className='Register-Email' style={{position: "absolute", left: "32%", top: "20%", height: "10%", width: "100%"}}>
              Email: <input name="My Input" />
            </label>
            <label className='Register-Password' style={{position: "absolute", left: "28.5%", top: "30%", height: "10%", width: "100%"}}>
              Password: <input type="password" name="My Input" />
            </label>
            <label className='Register-Confirm' style={{position: "absolute", left: "21%", top: "40%", height: "10%", width: "100%"}}>
               Confirm Password: <input type="password" name="My Input" />
            </label>
            <label className='Register-User' style={{position: "absolute", left: "28%", top: "50%", height: "10%", width: "100%"}}>
               Username: <input name="My Input" />
            </label>
            <p> </p>
            <div className='Sign Up' style={{position: "absolute", left: "45%", top: "60%", height: "10%", width: "100%"}}>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="primary"
                >
                Sign Up
              </Button>
          </div>
        </Row>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;