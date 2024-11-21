import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
//import star from "./../star.svg";
import {Button, Col} from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
//import * as Separator from "@radix-ui/react-separator";
import "./../App.css";
import { useState } from "react";


function App() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);


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
              // justifyContent: 'space-evenly',
              // alignContent: "space-evenly",
              padding: 0,
            }}>


          {/* Dropdown Menu */}
          <div
            className="avatarHeader"
            style={{
               paddingLeft: "1em",
               fontWeight: 700,
               border: "2px solid lightgray",
               height: '10%',
            }}>

              <p>Customize Avatar</p>
              </div>

            <div className="avatarSubheader"
            style={{
              marginTop: "5%",
              marginLeft: -133,
              border: "2px solid lightgray",
              height: "5%",
            }}>
              Avatar Subheading
            </div>

            <div
              className="dropdown"
              style={{
                position: "relative",
                margin: "1em auto",
              }}
            >
              <button
                className="dropbtn"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "1px solid dimgray",
                  width: "150px"
                }}
                onClick={toggleDropdown}
              >
                Value 
              </button>
              {dropdownVisible && (
                <div
                  className="dropdown-content"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    border: "1px solid dimgray",
                    borderRadius: "5px",
                    width: "150px",
                    //top: "100%",
                    left: "0",
                    opacity: 0.8,
                    zIndex: 1,
                    maxHeight: "40px",
                    overflowY: 'auto',
                  }}
                >
                  <p style={{ padding: "10px", margin: 0 }}>Option 1</p>
                  <p style={{ padding: "10px", margin: 0 }}>Option 2</p>
                  <p style={{ padding: "10px", margin: 0 }}>Option 3</p>
                </div>
              )}
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