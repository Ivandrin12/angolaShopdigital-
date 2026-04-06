import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-gray/30">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-8">
          <ShoppingBag size={48} />
        </div>
        <SectionHeading 
          title="O seu carrinho está vazio" 
          subtitle="Ops!"
          centered
        />
        <p className="text-gray-500 text-lg mb-10 text-center max-w-md">
          Parece que ainda não adicionou nenhum produto ao seu carrinho. Explore a nossa loja e encontre as melhores ofertas.
        </p>
        <Link to="/loja" className="btn-primary flex items-center gap-2 group">
          Começar a Comprar
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="O Seu Carrinho" 
          subtitle={`Você tem ${itemCount} itens`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Items List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-lg text-brand-black">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 bg-gray-50 rounded-full p-1 border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-brand-black hover:bg-brand-black hover:text-white transition-all shadow-sm"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-brand-black hover:bg-brand-black hover:text-white transition-all shadow-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-extrabold text-brand-black">
                          KZ {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          KZ {(item.salePrice || item.price).toLocaleString()} / un
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <Link to="/loja" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition-colors mt-4">
              <ShoppingBag size={18} /> Continuar a Comprar
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl sticky top-32">
              <h3 className="text-2xl font-bold mb-8">Resumo do Pedido</h3>
              
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="font-bold text-brand-black">KZ {total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-sm font-medium">Entrega</span>
                  <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Grátis</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-sm font-medium">Descontos</span>
                  <span className="font-bold text-brand-black">- KZ 0</span>
                </div>
                <div className="h-px bg-gray-100 w-full my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-black">Total</span>
                  <span className="text-3xl font-extrabold text-brand-black">KZ {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-lg">
                  Finalizar Compra <CreditCard size={20} />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                  <ShieldCheck size={14} className="text-green-500" /> Pagamento 100% Seguro
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-10 pt-10 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 text-center">Formas de Pagamento</p>
                <div className="flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
