import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { motion } from 'motion/react';
import { TrendingUp, Package, Globe, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';

export default function Dropshipping() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('isDropshipping', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(data.length > 0 ? data : SAMPLE_PRODUCTS.filter(p => p.isDropshipping));
    });
    return () => unsubscribe();
  }, []);

  const steps = [
    { icon: <TrendingUp size={24} />, title: 'Escolha Produtos', desc: 'Selecione os produtos virais e em tendência para o seu nicho.' },
    { icon: <Package size={24} />, title: 'Importe para Loja', desc: 'Integre facilmente os produtos na sua plataforma de vendas.' },
    { icon: <Globe size={24} />, title: 'Venda Globalmente', desc: 'Alcance clientes em todo o mundo com logística automatizada.' },
    { icon: <DollarSign size={24} />, title: 'Lucro Direto', desc: 'Receba o pagamento e o fornecedor cuida de todo o envio.' }
  ];

  return (
    <div className="min-h-screen bg-brand-gray/30">
      {/* Hero Section */}
      <div className="bg-brand-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading 
            title="Oportunidades de Dropshipping" 
            subtitle="Venda sem estoque"
            centered
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Descubra os produtos mais lucrativos do mercado e comece a sua operação de dropshipping com fornecedores confiáveis.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm group hover:bg-white/10 transition-all"
              >
                <div className="text-brand-gold mb-4 flex justify-center group-hover:scale-110 transition-transform">{s.icon}</div>
                <h4 className="font-bold text-sm mb-2">{s.title}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dropshipping Products Grid */}
      <section className="section-padding">
        <SectionHeading 
          title="Produtos em Tendência" 
          subtitle="Mais vendidos da semana"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section-padding">
        <div className="bg-white rounded-[50px] p-12 lg:p-24 border border-gray-100 shadow-2xl flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://picsum.photos/seed/dropship/800/600" 
              alt="Dropshipping Partnership" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <SectionHeading 
              title="Seja Nosso Parceiro de Dropshipping" 
              subtitle="Expanda o seu negócio"
            />
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Oferecemos suporte completo para novos empreendedores que desejam utilizar a nossa rede de fornecedores e logística.
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              <li className="flex items-center gap-3 text-sm font-bold text-brand-black">
                <CheckCircle className="text-green-500" size={18} /> Fornecedores Verificados
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-brand-black">
                <CheckCircle className="text-green-500" size={18} /> Margens de Lucro Elevadas
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-brand-black">
                <CheckCircle className="text-green-500" size={18} /> Suporte Estratégico
              </li>
            </ul>
            <button className="btn-primary flex items-center gap-2 group">
              Quero ser Parceiro <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
