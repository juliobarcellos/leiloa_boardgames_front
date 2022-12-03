import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuctionPage from './pages/AuctionPage';
import ScrollToTop from './components/ScrollToTop';
import NewAuctionPage from './pages/NewAuctionPage';
import { useState } from 'react';
import TopBarMenu from './components/TopBarMenu';
import Checkout from './pages/Checkout';
import Payment from './pages/Checkout/Payment';
import OrderDetails from './pages/OrderDetails';
import initialUserCtx, { userContext } from './context/user';
import Footer from './components/Footer';

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <Router>
        <ScrollToTop />
        <userContext.Provider value={initialUserCtx} >
          <TopBarMenu search={search} setSearch={setSearch} />
          <Routes>
            <Route path='/' element={<Home search={search} setSearch={setSearch} />} />
            <Route path='leilao/novo' element={<NewAuctionPage />} />
            <Route path="leilao/:id" element={<AuctionPage />} />
            <Route path='leilao/:id/checkout' element={<Checkout />} />
            <Route path='leilao/:id/payment' element={<Payment />} />
            <Route path='leilao/:id/details' element={<OrderDetails />} />
          </Routes>
          <Footer/>
        </userContext.Provider>
      </Router>
    </>
  );
}

export default App;
