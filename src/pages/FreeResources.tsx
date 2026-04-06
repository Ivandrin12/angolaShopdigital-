import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Download, Gift, Users, Send, CheckCircle } from 'lucide-react';

export default function FreeResources() {
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('isFree', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(data.length > 0 ? data : SAMPLE_PRODUCTS.filter(p => p.isFree));
    });
    return () => unsubscribe();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-brand-gray/30">
      {/* Hero Section */}
      <div className="bg-brand-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading 
            title="Recursos Gratuitos" 
            subtitle="O seu crescimento começa aqui"
            centered
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Baixe gratuitamente as melhores ferramentas, templates e guias para acelerar o seu negócio digital sem gastar nada.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <Gift className="text-brand-gold" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">100% Grátis</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <Download className="text-brand-gold" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Download Instantâneo</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <Users className="text-brand-gold" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Comunidade Ativa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Section */}
      <section className="section-padding">
        <div className="bg-brand-gold rounded-[50px] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-6 leading-tight">
              Acesso Exclusivo à <br />
              Nossa Biblioteca VIP.
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Deixe o seu e-mail para receber acesso imediato a todos os nossos recursos gratuitos e atualizações semanais.
            </p>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 border border-white/30 rounded-full py-4 px-8 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/30 transition-all"
                  required
                />
                <button type="submit" className="bg-white text-brand-gold px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  Aceder Agora <Send size={20} />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 bg-white/20 p-6 rounded-3xl border border-white/30"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-gold">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Inscrição Confirmada!</h4>
                  <p className="text-sm text-white/80">Verifique o seu e-mail para o link de acesso.</p>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex-1 w-full aspect-square max-w-md rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/free/800/800" 
              alt="Free Resources Library" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Free Products Grid */}
      <section className="section-padding">
        <SectionHeading 
          title="Biblioteca de Downloads" 
          subtitle="Escolha o que precisa"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
