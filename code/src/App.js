import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Loginpage";
import HomePage from "./Components/Homepage";
import SignUp from "./Components/RegisterPage";
import TaskPage from "./Components/TaskPage";
import AvatarPage from "./Components/Avatarpage";

import "./App.css";

function App() {
  const [points, setPoints] = useState(0);
  return (
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<HomePage points={points} setPoints={setPoints}/>} />
            <Route path="/task" element={<TaskPage points={points} setPoints={setPoints}/>} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/avatar" element={<AvatarPage points={points} setPoints={setPoints}/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
