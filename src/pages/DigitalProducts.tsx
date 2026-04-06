import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { motion } from 'motion/react';
import { FileText, Layout, CheckCircle, Zap, ArrowRight } from 'lucide-react';

export default function DigitalProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('isDigital', '==', true), where('isFree', '==', false));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(data.length > 0 ? data : SAMPLE_PRODUCTS.filter(p => p.isDigital && !p.isFree));
    });
    return () => unsubscribe();
  }, []);

  const benefits = [
    { icon: <Zap size={24} />, title: 'Entrega Instantânea', desc: 'Receba o link de download imediatamente após a confirmação do pagamento.' },
    { icon: <CheckCircle size={24} />, title: 'Qualidade Premium', desc: 'Recursos testados e validados por especialistas do mercado digital.' },
    { icon: <Layout size={24} />, title: 'Fácil de Usar', desc: 'Templates e guias prontos para serem aplicados no seu negócio hoje.' },
    { icon: <FileText size={24} />, title: 'Vitalício', desc: 'Acesso permanente aos arquivos e atualizações futuras sem custos extras.' }
  ];

  return (
    <div className="min-h-screen bg-brand-gray/30">
      {/* Hero Section */}
      <div className="bg-brand-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading 
            title="Produtos Digitais Premium" 
            subtitle="Acelere os seus resultados"
            centered
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            E-books, templates, packs de conteúdo e ferramentas exclusivas para transformar o seu negócio digital.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm"
              >
                <div className="text-brand-gold mb-4 flex justify-center">{b.icon}</div>
                <h4 className="font-bold text-sm mb-2">{b.title}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Custom Request Section */}
      <section className="section-padding">
        <div className="bg-white rounded-[50px] p-12 lg:p-24 border border-gray-100 shadow-2xl flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <SectionHeading 
              title="Precisa de algo personalizado?" 
              subtitle="Serviços Digitais"
            />
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Não encontrou o que procurava? A nossa equipa de especialistas pode criar templates, e-books ou estratégias personalizadas para o seu nicho.
            </p>
            <button className="btn-primary flex items-center gap-2 group">
              Falar com Especialista <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://picsum.photos/seed/custom/800/600" 
              alt="Custom Digital Services" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
