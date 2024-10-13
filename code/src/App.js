import logo from './logo.svg';
import logo2 from './logo2.svg';
import { Button, Col, Container, Row } from "react-bootstrap";
import './App.css';

function App() {
  return (
    <><div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo2} className="App-logo2" alt="logo" />
          <Button
            onPress={() => { } }
            variant="neutral"
            size="small"
          >
            Sign in
          </Button>
          <Button
            onPress={() => { } }
            variant="primary"
            size="small"
          >
            Register
          </Button>
      </header>
    </div>
    <div>
      <background className="App-background">

      </background>

    </div></>
  );
}

export default App;
