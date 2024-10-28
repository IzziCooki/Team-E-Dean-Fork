import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import star from "./../star.svg";
import { Button, Col, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
import * as Separator from "@radix-ui/react-separator";
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
          <Col className="App-panel3">
            <div className="Column 1" style={{ width: "100%", height: "100%" }}>
              <img
                src={logo2}
                className="App-logo3"
                alt="logo"
                object-fit="fill"
              ></img>
            </div>
          </Col>
          <Col className="App-panel4">
            <div
              className="Column 2"
              style={{
                width: "100%",
                height: "100%",
                padding: "5%",
              }}
            >
              <p className="App-colHead">History</p>
              <Separator.Root
                className="SeparatorRoot"
                style={{ margin: "15px 0" }}
              />
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
            </div>
          </Col>
          <Col>
            <Row className="App-panel5" style={{ height: "35%" }}>
              <div
                className="Column 3 Row 1"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "5%",
                }}
              >
                <p className="App-colHead">Avatar Details</p>
                <p className="App-colBody2">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Curae
                  amet nisl mattis phasellus pulvinar consectetur dignissim
                  eros. Eu curae erat malesuada massa auctor pulvinar egestas.
                </p>
                <p className="App-buttons2">
                  <Button
                    onClick={() => {
                      navigate("/avatar");
                    }}
                    variant="primary"
                    size="small"
                  >
                    Customize Avatar
                  </Button>
                </p>
              </div>
            </Row>
            <Row className="App-panel5" style={{ top: "50%", height: "35%" }}>
              <div
                className="Column 3 Row 1"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "5%",
                }}
              >
                <p className="App-colHead">Task Preview</p>
                <Separator.Root
                  className="SeparatorRoot"
                  style={{ margin: "15px 0" }}
                />
                <p className="App-colBody">Task 1</p>
                <p className="App-colBody2">Deadline</p>
                <p className="App-colBody">Task 2</p>
                <p className="App-colBody2">Deadline</p>
                <p>
                  <Button onClick={() => {}} variant="primary" size="small">
                    Hide
                  </Button>
                </p>
              </div>
            </Row>
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
