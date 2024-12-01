import React from "react";
import logo from "../../logo.svg";
import logo2 from "../../logo2.svg";
//import star from "./../star.svg";
import { Button, Col } from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
//import * as Separator from "@radix-ui/react-separator";
import "../../App.css";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function AvatarPage() {
  const navigate = useNavigate();

  // State to track which dropdown is currently visible (null = none visible)
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);

  // State to track selected options for each dropdown
  const [selectedOptions, setSelectedOptions] = useState(Array(6).fill("None"));

  // Toggles dropdown visibility for the selected index
  const toggleDropdown = (index) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  // Sets the selected option for a specific dropdown and closes it
  const selectOption = (index, option) => {
    const newOptions = [...selectedOptions];
    newOptions[index] = option;
    setSelectedOptions(newOptions);
    setDropdownVisibleIndex(null);
  };

  // Closes the dropdown when clicking outside of it
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

  //labels for each dropdown (order corresponds to dropdown buttons)
  const dropdownLabels = [
    "Background",
    "Skin Tone",
    "Eye Color",
    "Hair",
    "Hats",
    "Outfits",
  ];

  //temporary dropdown values
  const dropdownOptions = [
    ["hearts", "flowers", "pawprints", "None"],
    ["Fair", "Tan", "Dark", "None"],
    ["Blue", "Brown", "Green", "None"],
    ["Blonde", "Brown", "Black", "None"],
    ["Cat Ears", "Gnome Hat", "Tiara", "None"],
    ["Cat Onesie", "Overalls", "Princess Dress", "None"],
  ];

  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            {/* Button to navigate to the homepage*/}
            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="neutral"
              size="small"
            >
              Home
            </Button>

            {/* Button to navigate to the task page*/}
            <Button
              onClick={() => {
                navigate("/task");
              }}
              variant="neutral"
              size="small"
            >
              Tasks
            </Button>

            {/* Button to sign out */}
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
          <div
            className="avatar-container"
            style={{
              display: "flex",
              alignItems: "stretch",
              position: "absolute",
              top: "15%",
              left: "5%",
              right: "5%",
              height: "70%",
              gap: "5%",
            }}
          >
            {/* Avatar Display column */}
            <Col
              className="avatarCol"
              style={{
                flex: "1",
                backgroundColor: "white",
                opacity: 0.8,
                border: "2px solid lightgray",
              }}
            >
              {/* Avatar Goes Here */}
              <div className="avatarPlaceHolder">
                <p>Avatar image here later</p>
              </div>
            </Col>

            {/* Column that holds all informaiton for the customize avatar box */}
            <Col
              className="customizeAvatar"
              style={{
                flex: "2", // takes double the space compared to the avatar display column
                backgroundColor: "white",
                opacity: 0.8,
                border: "2px solid lightgray",
                borderRadius: "10px",
                padding: "1em",
              }}
            >
              {/* Section Header */}
              <div
                className="avatarHeader"
                style={{
                  fontWeight: 700,
                  textAlign: "left",
                  height: "5%",
                  marginTop: "3%",
                  marginLeft: "3%",
                }}
              >
                <p>Customize Avatar</p>
              </div>

              {/* Section Subheader */}
              <div
                className="avatarSubheader"
                style={{
                  textAlign: "left",
                  marginTop: ".5em",
                  marginBottom: "5%",
                  marginLeft: "3%",
                  color: "dimgray",
                }}
              >
                Subheading
              </div>

              {/* Dropdown grid for Avatar Customization */}
              <div
                className="dropdown-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)", //estabishes 3 columns
                  gridGap: "2em",
                }}
              >
                {selectedOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown"
                    style={{
                      position: "relative",
                      padding: "10px",
                    }}
                  >
                    {/* Label for Each Dropdown */}
                    <p
                      style={{
                        marginBottom: "5px",
                        fontWeight: 300,
                        textAlign: "left",
                      }}
                    >
                      {dropdownLabels[index]}
                    </p>

                    {/* Actual Dropdown Button */}
                    <button
                      className="dropbtn"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        color: "black",
                        padding: "5px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "1px solid dimgray",
                        width: "100%",
                        textAlign: "left",
                        marginBottom: "8%",
                      }}
                      onClick={() => toggleDropdown(index)}
                    >
                      {option}
                      <FaChevronDown />
                    </button>

                    {/* Content of the Dropdown Menus */}
                    {dropdownVisibleIndex === index && (
                      <div
                        className="dropdown-content"
                        style={{
                          position: "absolute",
                          top: "80%",
                          left: "5%",
                          backgroundColor: "white",
                          border: "1px solid dimgray",
                          borderRadius: "5px",
                          width: "90%",
                          zIndex: 10,
                          opacity: 0.8,
                          overflowY: "auto",
                          maxHeight: "60px",
                        }}
                      >
                        {dropdownOptions[index].map((opt, idx) => (
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
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </div>
        </div>
      </div>
      {/* Bottom of the App */}
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default AvatarPage;
