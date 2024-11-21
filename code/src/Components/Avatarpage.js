import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
//import star from "./../star.svg";
import {Button, Col} from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
//import * as Separator from "@radix-ui/react-separator";
import "./../App.css";
import {
  SelectField,
  SelectItem,
  } from "primitives"

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
                navigate("/task");
              }}
              variant="neutral"
              size="small"
            >
              Tasks
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
        <div>


          {/* Avatar Display column */}
          <Col
            className="avatarCol"
            style={{
              position: "absolute",
              display: "flex",
              top: "15%",
              left: "5%",
              width: "30%",
              height: "70%",
              backgroundColor: "white",
              opacity: .8,
              border: "2px solid lightgray",
              borderRadius: "10px",
            }}
          >
            {/* Avatar Goes Here */}
            <div className="avatarPlaceHolder"> 
              <p>Avatar image here later</p>
            </div>
          </Col>

          <Col
            className="customizeAvatar"
            style={{
              position: "absolute",
              display: "flex",
              top: "15%",
              left: "40%",
              width: "55%",
              height: "70%",
              backgroundColor: "white",
              opacity: .8,
              border: "2px solid lightgray",
              borderRadius: "10px",
            }}>
          <div className="avatarHeader"
          style={{
            paddingLeft: "1em",
            fontWeight: 700,
          }}>
            <p>Customize Avatar</p>
          </div>
          <div className="avatarSubheader"
          style={{
            marginTop: 25,
            marginLeft: -130,
          }}>
            <p>Avatar Subheading</p>
          </div>
          </Col>

        </div>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}
export default App;
