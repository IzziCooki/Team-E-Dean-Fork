import logo from "./logo.svg";
import logo2 from "./logo2.svg";
import { Button } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <Button onClick={() => {}} variant="neutral" size="small">
              Sign in
            </Button>
            <Button onClick={() => {}} variant="primary" size="small">
              Register
            </Button>
          </div>
        </header>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-panel">
        <img src={logo2} className="App-logo2" alt="logo" object-fit="fill" />
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;
