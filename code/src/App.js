import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './Components/Loginpage';
import AvatarPage from './Components/Avatarpage';
import RegistrationPage from './Components/RegistrationPage';
import TaskPage from './Components/TaskPage';

import "./App.css"

function App() {
  return (
    <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route path="/avatar" element={<AvatarPage />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </div>
        </Router>
  );
}

export default App;
