import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { User, ShoppingBag, Download, Heart, Settings, LogOut, ShieldCheck, Mail, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, profile, logout, signIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-gray/30">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-8">
          <User size={48} />
        </div>
        <SectionHeading 
          title="Acesse a Sua Conta" 
          subtitle="Área do Cliente"
          centered
        />
        <p className="text-gray-500 text-lg mb-10 text-center max-w-md">
          Faça login para ver o seu histórico de pedidos, downloads digitais e gerir a sua conta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login" className="btn-outline flex items-center justify-center gap-2 px-10">
            Entrar na Conta
          </Link>
          <Link to="/registo" className="btn-primary flex items-center justify-center gap-2 px-10">
            <User size={20} /> Criar Conta Grátis
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: <ShoppingBag size={20} />, label: 'Meus Pedidos', count: 0 },
    { icon: <Download size={20} />, label: 'Downloads Digitais', count: 0 },
    { icon: <Heart size={20} />, label: 'Lista de Desejos', count: 0 },
    { icon: <Settings size={20} />, label: 'Configurações', count: null }
  ];

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover border-4 border-brand-gray p-1"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-1">{user.displayName}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">{profile?.role === 'admin' ? 'Administrador' : 'Cliente VIP'}</p>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-sm text-gray-500 bg-brand-gray p-3 rounded-2xl">
                  <Mail size={16} className="text-brand-gold" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 bg-brand-gray p-3 rounded-2xl">
                  <Calendar size={16} className="text-brand-gold" />
                  <span>Membro desde 2026</span>
                </div>
              </div>

              <button 
                onClick={logout}
                className="w-full mt-8 flex items-center justify-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 py-4 rounded-2xl transition-all"
              >
                <LogOut size={18} /> Sair da Conta
              </button>
            </div>

            <div className="bg-brand-black p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl" />
              <h4 className="text-xl font-bold mb-4">Suporte VIP</h4>
              <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                Como cliente VIP, você tem acesso prioritário ao nosso suporte especializado.
              </p>
              <Link to="/contacto" className="bg-brand-gold text-white w-full py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-gold/90 transition-all">
                Abrir Ticket
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-gold group-hover:text-white transition-colors mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</h4>
                  {item.count !== null && (
                    <span className="text-2xl font-extrabold text-brand-black">{item.count}</span>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-brand-gray rounded-full flex items-center justify-center text-gray-300 mb-6">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-2">Nenhum pedido recente</h3>
              <p className="text-gray-500 max-w-sm mb-8">
                Você ainda não realizou nenhuma compra. Explore a nossa loja e encontre os melhores produtos.
              </p>
              <Link to="/loja" className="btn-primary">
                Ir para a Loja
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-green-500" size={24} /> Segurança da Conta
                </h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  A sua conta está protegida com autenticação segura do Google. Mantenha os seus dados sempre atualizados.
                </p>
                <button className="text-sm font-bold text-brand-black hover:text-brand-gold transition-colors">
                  Gerir Segurança →
                </button>
              </div>
              <div className="bg-brand-gold/10 p-10 rounded-[40px] border border-brand-gold/20 shadow-sm">
                <h4 className="text-xl font-bold text-brand-gold mb-6 flex items-center gap-2">
                  <Heart className="text-brand-gold" size={24} /> Programa de Fidelidade
                </h4>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Ganhe pontos em cada compra e troque por descontos exclusivos em produtos digitais e físicos.
                </p>
                <button className="text-sm font-bold text-brand-gold hover:text-brand-black transition-colors">
                  Ver Meus Pontos →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
