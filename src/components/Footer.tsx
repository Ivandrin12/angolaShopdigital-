import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { BRAND_INFO } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-black font-bold text-xl group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight">
              {BRAND_INFO.name}
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            {BRAND_INFO.slogan}
          </p>
          <div className="flex items-center gap-4">
            <a href={`https://instagram.com/${BRAND_INFO.instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm">
            <li><Link to="/loja" className="hover:text-white transition-colors">Loja Virtual</Link></li>
            <li><Link to="/produtos-digitais" className="hover:text-white transition-colors">Produtos Digitais</Link></li>
            <li><Link to="/recursos-gratis" className="hover:text-white transition-colors">Recursos Grátis</Link></li>
            <li><Link to="/dropshipping" className="hover:text-white transition-colors">Dropshipping</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Dicas</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-lg mb-6">Suporte</h4>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm">
            <li><Link to="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
            <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Subscreva para receber novidades, promoções e recursos exclusivos.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="absolute right-1.5 top-1.5 bg-brand-gold text-white p-2 rounded-full hover:bg-brand-gold/90 transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-xs">
        <p>© {currentYear} {BRAND_INFO.name}. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>{BRAND_INFO.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+244 {BRAND_INFO.whatsapp}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
