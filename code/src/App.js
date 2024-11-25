import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Pages/Loginpage";
import HomePage from "./Components/Pages/Homepage";
import SignUp from "./Components/Pages/RegisterPage";
import TaskPage from "./Components/Pages/TaskPage";
import AvatarPage from "./Components/Pages/Avatarpage";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
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
