import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginModalWrapper from './components/Modals/Login/LoginModalWrapper';
import RegisterModalWrapper from './components/Modals/Register/RegisterModalWrapper';
import ForgotPasswordWrapper from './components/Modals/ForgotPassword/ForgotPasswordWrapper';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path="/login" element={<LoginModalWrapper />} />
            <Route path="/register" element={<RegisterModalWrapper />} />
            <Route path="/forgot_password" element={<ForgotPasswordWrapper />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
