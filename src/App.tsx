import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import DigitalProducts from './pages/DigitalProducts';
import FreeResources from './pages/FreeResources';
import Dropshipping from './pages/Dropshipping';
import Blog from './pages/Blog';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loja" element={<Shop />} />
                <Route path="/produtos-digitais" element={<DigitalProducts />} />
                <Route path="/recursos-gratis" element={<FreeResources />} />
                <Route path="/dropshipping" element={<Dropshipping />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/sobre-nos" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registo" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
