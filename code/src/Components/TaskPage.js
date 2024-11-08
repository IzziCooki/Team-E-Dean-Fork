import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import Award from "./../Award.svg";
import { Button, Col } from "react-bootstrap";
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
      <div>
        <Col
          className="Col1"
          style={{
            position: "fixed",
            display: "flex",
            top: "12%",
            left: "8%",
            width: "60%",
            height: "74%",
            backgroundColor: "white",
          }}
        >
          <div
            className="InnerContent"
            style={{
              paddingLeft: "5%",
              width: "95%",
            }}
          >
            <p
              style={{
                fontSize: "110%",
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              Tasks
            </p>
            <p
              style={{
                color: "gray",
                fontSize: "90%",
                fontWeight: "400",
                lineHeight: "20%",
                paddingBottom: "5%",
              }}
            >
              Date (today)
            </p>
            <div class="App-bordered">
              <Col
                className="Col2"
                style={{ width: "11%", position: "fixed", display: "flex" }}
              >
                <img
                  src={logo}
                  className="App-logo3"
                  alt="logo"
                  style={{ margin: "2%" }}
                />
              </Col>
              <Col
                className="Col3"
                style={{
                  width: "50%",
                  position: "fixed",
                  display: "flex",
                  left: "25%",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "100%",
                      fontWeight: "600",
                      lineHeight: "50%",
                    }}
                  >
                    Task 1
                  </p>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "90%",
                      fontWeight: "600",
                      lineHeight: "50%",
                    }}
                  >
                    Task Description
                  </p>
                  <p>
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        textDecorationLine: "underline",
                      }}
                    >
                      Edit Task
                    </Button>
                  </p>
                  <Button style={{ top: "20%" }}>Done</Button>
                </div>
              </Col>
            </div>
            <div class="App-bordered">
              <Col
                className="Col2"
                style={{ width: "11%", position: "fixed", display: "flex" }}
              >
                <img
                  src={logo}
                  className="App-logo3"
                  alt="logo"
                  style={{ margin: "2%" }}
                />
              </Col>
              <Col
                className="Col3"
                style={{
                  width: "50%",
                  position: "fixed",
                  display: "flex",
                  left: "25%",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "100%",
                      fontWeight: "600",
                      lineHeight: "50%",
                    }}
                  >
                    Task 2
                  </p>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "90%",
                      fontWeight: "600",
                      lineHeight: "50%",
                    }}
                  >
                    Task Description
                  </p>
                  <p>
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        textDecorationLine: "underline",
                      }}
                    >
                      Edit Task
                    </Button>
                  </p>
                  <Button style={{ top: "20%" }}>Done</Button>
                </div>
              </Col>
            </div>
          </div>
          <div
            style={{
              height: "10%",
              paddingTop: "3%",
              paddingRight: "7%",
            }}
          >
            <Button
              className="newTaskButton"
              style={{
                width: "150%",
                height: "100%",
                backgroundColor: "#606c38",
                border: "#606c38",
                color: "white",
                fontSize: "90%",
                borderRadius: "10px",
              }}
            >
              New Task
            </Button>
          </div>
        </Col>
        <Col
          style={{
            position: "fixed",
            display: "flex",
            top: "12%",
            left: "72%",
            width: "20%",
            height: "30%",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              paddingTop: "10%",
              paddingLeft: "39%",
              textAlign: "center",
            }}
          >
            <img src={Award} alt="award" style={{}}></img>
            <p
              style={{ fontSize: "110%", fontWeight: "600", lineHeight: "50%" }}
            >
              100%
            </p>
            <p style={{ lineHeight: "50%" }}>progress</p>
          </div>
        </Col>
        <Col
          style={{
            position: "fixed",
            display: "flex",
            top: "47%",
            left: "72%",
            width: "20%",
            height: "39%",
            backgroundColor: "white",
          }}
        >
          <div style={{ paddingLeft: "7%" }}>
            <p
              style={{
                fontSize: "100%",
                fontWeight: "600",
                lineHeight: "50%",
                textDecorationLine: "underline",
              }}
            >
              Upcoming Tasks
            </p>
            <p
              style={{
                fontSize: "90%",
                fontWeight: "400",
                lineHeight: "50%",
                color: "gray",
              }}
            >
              Day/Month
            </p>
            <p
              style={{
                fontSize: "90%",
                fontWeight: "600",
                lineHeight: "50%",
                paddingTop: "20%",
              }}
            >
              Task
            </p>
            <p
              style={{
                fontSize: "80%",
                fontWeight: "400",
                lineHeight: "50%",
                color: "gray",
              }}
            >
              Description
            </p>
          </div>
        </Col>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;
