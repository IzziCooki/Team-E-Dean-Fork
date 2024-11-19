import React, {useState} from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Col } from "react-bootstrap";
//import { Link } from 'react-router-dom'; //might be useful later
import {NavLink, useNavigate } from "react-router-dom";
import "./../App.css";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase.js';




const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            console.log("Not Working")

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
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="primary"
              size="small"
            >
              Register
            </Button>
          </div>
        </header>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-panel2"></div>
      <div className="App-panel">
        <Col>
          <div className="Column 1" style={{ width: "85%", height: "90%" }}>
            <img
              src={logo2}
              className="App-logo3"
              alt="logo"
              object-fit="fill"
            />
          </div>
        </Col>
        <Col>
          <main >        
        <section>
            <div>
                <div>                  
                    <h1>  </h1>                                                                            
                    <form>                                                                                            
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder=""
                                    onChange={(e)=>setEmail(e.target.value)}                              
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder=""
                                    onChange={(e)=>setPassword(e.target.value)}            
                            />
                        </div>                                             

                        <button
                            type="submit" 
                            onClick={onLogin}                        
                        >  
                            Login                              
                        </button>

                    </form>

                    <p>
                        Don't have an account?{' '}
                        <NavLink to="/register" >
                            Sign Up
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
        </Col>
      </div>
      <div className="App-background">{}</div>
    </>
  )
}

export default Login;