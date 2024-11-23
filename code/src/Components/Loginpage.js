import React from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"; // Add `useNavigate`
import "./../App.css";
import useLoginAuth from "../Hooks/useLoginAuth";
const Login = () => {
  const { setEmail, setPassword, onLogin } = useLoginAuth();
  const navigate = useNavigate(); // Define `navigate`

  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <Button
              onClick={() => navigate("/register")} // Use `navigate` here
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
            <img src={logo2} className="App-logo3" alt="logo" />
          </div>
        </Col>
        <Col>
          <main>
            <section>
              <div>
                <div>
                  <form>
                    <div>
                      <label htmlFor="email-address">Email address</label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder=""
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button type="submit" onClick={onLogin}>
                      Login
                    </button>
                  </form>

                  <p>
                    Don't have an account?{" "}
                    <NavLink to="/register">Sign Up</NavLink>
                  </p>
                </div>
              </div>
            </section>
          </main>
        </Col>
      </div>
      <div className="App-background"></div>
    </>
  );
};

export default Login;
