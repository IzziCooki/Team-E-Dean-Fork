import React, {useState} from 'react'
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import {useNavigate } from "react-router-dom";
import "./../App.css";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase.js';
import { doc,  setDoc } from "firebase/firestore";
import { db } from "./firebase";


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const onSubmit = async (e) => {
      e.preventDefault()
     

      function checkPassword(password, confirmPassword){
        return password === confirmPassword ? true : false 
      }

      if (checkPassword(password, confirmPassword)){
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            console.log(user);
            navigate("/")
            // Add user info to database
            try {
                    // "user" is the database document
                    setDoc(doc(db, "user", user.uid), {
                        id: user.uid,
                        email: email,
                        username: userName,
                        tasks: []
                      });

                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(errorMessage)
            // ..
        });

      }else{
        alert("Passwords do no match!")
        
      }




    }
  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <Button onClick={() => {navigate('/')}} variant="neutral" size="small">
              Login
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
            <label className='Register-Email' htmlFor="email-address" style={{position: "absolute", left: "32%", top: "20%", height: "10%", width: "100%"}}>
              Email: <input name="My Input"                                 type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder=""   />
            </label>
            <label className='Register-Password' htmlFor="password" style={{position: "absolute", left: "28.5%", top: "30%", height: "10%", width: "100%"}}>
              Password: <input                                 
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="" 
                                name="My Input" />
            </label>
            <label className='Register-Confirm' style={{position: "absolute", left: "21%", top: "40%", height: "10%", width: "100%"}}>
            
               Confirm Password: <input type="password"
                                label="Create password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required                                 
                                placeholder="" 
                                name="My Input"  
                                />
            </label>
            <label className='Register-User' style={{position: "absolute", left: "28%", top: "50%", height: "10%", width: "100%"}}>
               Username: <input name="My Input"
               value={userName}
               onChange={(e) => setUsername(e.target.value)} />
            </label>
            <p> </p>
            <div className='Sign Up' style={{position: "absolute", left: "45%", top: "60%", height: "10%", width: "100%"}}>
              <Button
              type="submit"
                onClick={onSubmit}
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

export default SignUp;