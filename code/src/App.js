import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Components/Loginpage";
import HomePage from "./Components/Homepage";
import RegistrationPage from "./Components/RegistrationPage";
import TaskPage from "./Components/TaskPage";
import AvatarPage from "./Components/Avatarpage";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
