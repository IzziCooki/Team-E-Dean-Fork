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


function AvatarPage() {
  const navigate = useNavigate();
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(6).fill("None")
  );

 const toggleDropdown = (index) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  const selectOption = (index, option) => {
    const newOptions = [...selectedOptions];
    newOptions[index] = option;
    setSelectedOptions(newOptions);
    setDropdownVisibleIndex(null);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownVisibleIndex(null);
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const dropdownLabels = [
    "Background",
    "Skin Tone",
    "Eye Color",
    "Hair",
    "Hats",
    "Outfits",
  ];
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
              position: "fixed",
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
              display: "block",
              top: "15%",
              left: "40%",
              width: "55%",
              height: "62.5%",
              backgroundColor: "white",
              opacity: .8,
              border: "2px solid lightgray",
              borderRadius: "10px",
              padding: "20px",
            }}>


          {/* Dropdown Menu */}
          <div
            className="avatarHeader"
            style={{
               fontWeight: 700,
              //  border: "2px solid lightgray",
               textAlign: "left",
               height: "10%",
            }}>
              <p>Customize Avatar</p>
              </div>

            <div className="avatarSubheader"
            style={{
              textAlign: "left",
              // border: "2px solid lightgray",
              marginBottom: "5%",
            }}>
              Avatar Subheading
            </div>

           {/* Grid Layout for Dropdowns */}
           <div
              className="dropdown-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
                gridGap: "2em", // spacing between dropdowns
              }}
            >
              {selectedOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown"
                  style={{
                    position: "relative",
                    // border: "1px solid dimgray",
                    padding: "10px",
                  }}
                >

                {/* Label */}
                <p
                  style={{
                    marginBottom: "5px",
                    fontWeight: 300,
                    textAlign: "left",
                  }}
                >
                  {dropdownLabels[index]}
                </p>

                  <button
                    className="dropbtn"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "5px 20px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      border: "1px solid dimgray",
                      width: "100%",
                      textAlign: "left",
                    }}
                    onClick={() => toggleDropdown(index)}
                  >
                    {option}
                  </button>
                  {dropdownVisibleIndex === index && (
                    <div
                      className="dropdown-content"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "white",
                        border: "1px solid dimgray",
                        borderRadius: "5px",
                        width: "100%",
                        zIndex: 10,
                        opacity: 0.95,
                      }}
                    >
                      {["Option 1", "Option 2", "Option 3", "None"].map(
                        (opt, idx) => (
                          <p
                            key={idx}
                            style={{
                              padding: "5px",
                              margin: 0,
                              cursor: "pointer",
                            }}
                            onClick={() => selectOption(index, opt)}
                          >
                            {opt}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
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
};

export default AvatarPage;