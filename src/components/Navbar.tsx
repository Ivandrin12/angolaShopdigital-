import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signIn, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Loja', path: '/loja' },
    { name: 'Produtos Digitais', path: '/produtos-digitais' },
    { name: 'Recursos Grátis', path: '/recursos-gratis' },
    { name: 'Dropshipping', path: '/dropshipping' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre Nós', path: '/sobre-nos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className={`glass-nav transition-all duration-300 ${isScrolled ? 'py-3 shadow-md' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-black rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight hidden sm:block">
            {BRAND_INFO.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium hover:text-brand-gold transition-colors ${
                location.pathname === link.path ? 'text-brand-gold' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
          
          <Link to="/carrinho" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-brand-gold" title="Painel Admin">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <Link to="/perfil" className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-gray hover:border-brand-gold transition-colors">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Avatar" className="w-full h-full object-cover" />
              </Link>
              <button onClick={logout} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors" title="Sair">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-bold text-gray-600 hover:text-brand-gold transition-colors px-2"
              >
                Entrar
              </Link>
              <Link
                to="/registo"
                className="flex items-center gap-2 bg-brand-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-black/90 transition-all"
              >
                <User size={18} />
                Criar Conta
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium ${
                    location.pathname === link.path ? 'text-brand-gold' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user && isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-bold text-brand-gold"
                >
                  <LayoutDashboard size={20} />
                  Painel Administrativo
                </Link>
              )}
              {!user && (
                <div className="flex flex-col gap-4 mt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-white border-2 border-brand-black text-brand-black w-full py-4 rounded-xl font-bold"
                  >
                    Entrar na Conta
                  </Link>
                  <Link
                    to="/registo"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-brand-black text-white w-full py-4 rounded-xl font-bold"
                  >
                    <User size={20} />
                    Criar Conta Grátis
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
