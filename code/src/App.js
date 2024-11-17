import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Loginpage";
import HomePage from "./Components/Homepage";
import SignUp from "./Components/RegisterPage";
import TaskPage from "./Components/TaskPage";
import AvatarPage from "./Components/Avatarpage";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/avatar" element={<AvatarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
