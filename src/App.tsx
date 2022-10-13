import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginModalWrapper from './components/Modals/Login/LoginModalWrapper';
import RegisterModalWrapper from './components/Modals/Register/RegisterModalWrapper';
import ForgotPasswordWrapper from './components/Modals/ForgotPassword/ForgotPasswordWrapper';
import Home from './pages/Home';
import AuctionPage from './pages/AuctionPage';
import ScrollToTop from './components/ScrollToTop';
import NewAuctionPage from './pages/NewAuctionPage';
import { useState } from 'react';
import TopBarMenu from './components/TopBarMenu';
import Checkout from './pages/Checkout';
import Payment from './pages/Checkout/Payment';
import OrderDetails from './pages/OrderDetails';

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <Router>
        <ScrollToTop />
        <TopBarMenu search={search} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Home search={search} setSearch={setSearch} />} />
          <Route path="login" element={<LoginModalWrapper />} />
          <Route path="register" element={<RegisterModalWrapper />} />
          <Route path="forgot_password" element={<ForgotPasswordWrapper />} />
          <Route path='leilao/novo' element={<NewAuctionPage />} />
          <Route path="leilao/:id" element={<AuctionPage />} />
          <Route path='leilao/:id/checkout' element={<Checkout />} />
          <Route path='leilao/:id/payment' element={<Payment />} />
          <Route path='leilao/:id/details' element={<OrderDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
