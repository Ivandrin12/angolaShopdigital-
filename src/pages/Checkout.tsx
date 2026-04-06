import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { ShieldCheck, CreditCard, Truck, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-gray/30">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 lg:p-20 rounded-[60px] shadow-2xl text-center max-w-2xl border border-gray-100"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-display font-extrabold text-brand-black mb-6">Pedido Confirmado!</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            O seu pedido foi processado com sucesso. Enviamos um e-mail com todos os detalhes e o seu recibo. 
            Obrigado por confiar na <span className="font-bold text-brand-black">AngolaShopDigital</span>.
          </p>
          <Link to="/loja" className="btn-primary inline-flex items-center gap-2">
            Voltar para a Loja
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/carrinho" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition-colors mb-10">
          <ArrowLeft size={18} /> Voltar para o Carrinho
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Truck className="text-brand-gold" size={24} /> Informações de Entrega
              </h3>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Nome Completo</label>
                  <input type="text" placeholder="Ex: Ivandrin Ndala" className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">E-mail</label>
                  <input type="email" placeholder="Ex: seuemail@gmail.com" className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Telefone</label>
                  <input type="tel" placeholder="Ex: 944420213" className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Cidade</label>
                  <input type="text" placeholder="Ex: Luanda" className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all" required />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Endereço Completo</label>
                  <input type="text" placeholder="Rua, Bairro, Casa nº" className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all" required />
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <CreditCard className="text-brand-gold" size={24} /> Método de Pagamento
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-brand-black bg-brand-gray/50 transition-all">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                  <span className="text-xs font-bold uppercase tracking-widest">PayPal</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-transparent bg-brand-gray hover:border-gray-200 transition-all">
                  <CreditCard size={24} className="text-gray-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Cartão Visa</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-transparent bg-brand-gray hover:border-gray-200 transition-all">
                  <div className="w-6 h-6 bg-gray-400 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest">Multicaixa</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl sticky top-32">
              <h3 className="text-2xl font-bold mb-8">O Seu Pedido</h3>
              
              <div className="flex flex-col gap-4 mb-8 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-brand-black line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.quantity}x KZ {(item.salePrice || item.price).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 w-full my-6" />

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="font-bold text-brand-black">KZ {total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-sm font-medium">Entrega</span>
                  <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Grátis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-black">Total</span>
                  <span className="text-3xl font-extrabold text-brand-black">KZ {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {!user && (
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mb-2">
                    Faça <Link to="/login" className="text-brand-gold hover:underline">login</Link> ou <Link to="/registo" className="text-brand-gold hover:underline">crie uma conta</Link> para finalizar
                  </p>
                )}
                <button 
                  onClick={user ? handlePlaceOrder : () => navigate('/login')}
                  disabled={isProcessing}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-lg disabled:opacity-70"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    <>{user ? 'Pagar Agora' : 'Entrar e Pagar'} <Lock size={20} /></>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
                <ShieldCheck size={14} className="text-green-500" /> Checkout 100% Seguro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
