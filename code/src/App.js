import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './Components/Loginpage';

import "./App.css"

function App() {
  return (
    <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                </Routes>
            </div>
        </Router>
  );
}

export default App;
