import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Download, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-gray">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-black/5 rounded-l-[100px] -z-10 transform translate-x-1/4 rotate-12" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm w-fit border border-gray-100">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Líder em E-commerce & Produtos Digitais
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight text-brand-black">
            Tudo o que precisas <br />
            <span className="text-brand-gold">num só lugar.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
            Produtos físicos, recursos digitais e oportunidades para vender online. 
            Compra, aprende e cresce com a <span className="font-bold text-brand-black">AngolaShopDigital</span>.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/loja" className="btn-primary flex items-center gap-2 group">
              Explorar Loja
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/recursos-gratis" className="btn-outline flex items-center gap-2 group">
              Recursos Grátis
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
            <div>
              <h4 className="text-2xl font-bold text-brand-black">10k+</h4>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Clientes</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-brand-black">500+</h4>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Produtos</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-brand-black">4.9</h4>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Avaliação</p>
            </div>
          </div>
        </motion.div>
        
        {/* Image/Mockup Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="https://picsum.photos/seed/hero/1000/1200"
              alt="Hero"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Vendas Hoje</p>
              <h4 className="text-xl font-bold text-brand-black">+124%</h4>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Novo Pedido</p>
              <h4 className="text-xl font-bold text-brand-black">KZ 45.000</h4>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
