import React, { useState, useEffect } from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import star from "./../star.svg";
import { Button, Col, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
import * as Separator from "@radix-ui/react-separator";
import "./../App.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Components/firebase';
import { db } from "./firebase";
import { doc, getDoc } from 'firebase/firestore';


function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const email = user.email;
              // ...
              console.log("uid", uid)
              console.log("email", email)
              fetchUserData()


            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
              navigate("/");
              
            }
          });

    },)

        const getUserTasks = () => {
        try {
            let userId = null;

            // Wait for the authenticated user
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                userId = user.uid; // Get the user's UID


                    // Fetch Firestore document
              const userRef = doc(db, 'user', userId); // Reference to the user's document
              const userDoc = await getDoc(userRef);


              console.log(userDoc.data())
                
              } else {
                console.log('No user is signed in.');
              }
            });
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        }

        
        
        const fetchUserData = async () => {
          try {
            let userId = null;

            // Wait for the authenticated user
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                userId = user.uid; // Get the user's UID
                console.log('User ID:', userId);

                // Fetch Firestore document
                const userRef = doc(db, 'user', userId); // Reference to the user's document
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) { 
                  const data = userDoc.data();
                  setUserName(data.username) // Access the document data
                } else {
                  console.log('No such document!');
                }
              } else {
                console.log('No user is signed in.');
              }
            });
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        };


        const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <div>
              Hello {userName}
            </div>
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
              onClick={handleLogout}
              variant="neutral"
              size="small"
            >
              Sign Out
            </Button>
          </div>
        </header>

        <h2>{}</h2>
        <div>
          <Col className="App-panel3">
            <div className="Column 1" style={{ width: "100%", height: "100%", border: "2px solid lightgray", borderRadius: "5px" }}>
              <img
                src={logo2}
                className="App-logo3"
                alt="logo"
                object-fit="fill"
              ></img>
            </div>
          </Col>
          <Col className="App-panel4"
          style={{
            border: "2px solid lightgray",
            borderRadius: "5px",
          }}>
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
            <Row className="App-panel5" style={{ height: "35%", border: "2px solid lightgray", borderRadius: "5px"}}>
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
            <Row className="App-panel5" style={{ top: "50%", height: "35%", border: "2px solid lightgray", borderRadius: "5px" }}>
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
                  <Button onClick={() => {getUserTasks()}} variant="primary" size="small">
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
