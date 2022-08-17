import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginModalWrapper from './components/Modals/Login/LoginModalWrapper';
import RegisterModalWrapper from './components/Modals/Register/RegisterModalWrapper';
import ForgotPasswordWrapper from './components/Modals/ForgotPassword/ForgotPasswordWrapper';
import Home from './pages/Home';
import AuctionPage from './pages/AuctionPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="login" element={<LoginModalWrapper />} />
          <Route path="register" element={<RegisterModalWrapper />} />
          <Route path="forgot_password" element={<ForgotPasswordWrapper />} />
          <Route path="leilao/:id" element={<AuctionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
