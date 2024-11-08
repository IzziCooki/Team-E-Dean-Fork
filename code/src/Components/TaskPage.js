import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button} from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
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
                navigate("/home");
              }}
              variant="neutral"
              size="small"
            >
              Home
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="neutral"
              size="small"
            >
              Sign Out
            </Button>
          </div>
        </header>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;
