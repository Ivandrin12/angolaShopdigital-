import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { BRAND_INFO } from '../constants';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { label: 'Anos de Experiência', value: '5+' },
    { label: 'Clientes Satisfeitos', value: '10k+' },
    { label: 'Produtos Digitais', value: '200+' },
    { label: 'Parceiros Ativos', value: '50+' }
  ];

  const values = [
    { icon: <Target size={32} />, title: 'Missão', desc: 'Capacitar empreendedores angolanos e globais com as melhores ferramentas e produtos digitais.' },
    { icon: <Eye size={32} />, title: 'Visão', desc: 'Ser a plataforma líder em soluções de e-commerce e produtos digitais em Angola e no mundo.' },
    { icon: <Heart size={32} />, title: 'Valores', desc: 'Transparência, inovação, compromisso com o cliente e excelência em cada detalhe.' }
  ];

  return (
    <div className="min-h-screen bg-brand-gray/30">
      {/* Hero Section */}
      <div className="bg-brand-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading 
            title="Sobre a AngolaShopDigital" 
            subtitle="Conheça a nossa história"
            centered
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Uma marca moderna criada para oferecer produtos, recursos e soluções digitais para quem quer comprar, aprender e empreender com facilidade.
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
              >
                <h4 className="text-4xl font-extrabold text-brand-gold mb-2">{s.value}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <SectionHeading 
              title="A Nossa Jornada Digital" 
              subtitle="Onde tudo começou"
            />
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              A <span className="font-bold text-brand-black">{BRAND_INFO.name}</span> nasceu da necessidade de conectar o mercado angolano às melhores oportunidades do mundo digital. 
              Sob a liderança de <span className="font-bold text-brand-black">{BRAND_INFO.owner}</span>, transformamos a forma como as pessoas compram e vendem online.
            </p>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Não somos apenas uma loja; somos um ecossistema completo para o crescimento. Oferecemos desde produtos físicos de alta qualidade até recursos digitais avançados que permitem a qualquer pessoa iniciar o seu próprio negócio.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/loja" className="btn-primary flex items-center gap-2 group">
                Explorar Loja <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contacto" className="btn-outline flex items-center gap-2 group">
                Falar Connosco
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="rounded-[50px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/about/800/1000" 
                alt="Our Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-bold text-brand-black">Excelência Digital</h4>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Premiada em 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-brand-black text-white rounded-[60px] my-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8">
              <div className="text-brand-gold mb-6">{v.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding text-center">
        <SectionHeading 
          title="Porquê Escolher-nos?" 
          subtitle="Confiança e Qualidade"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <ShieldCheck className="text-brand-gold mx-auto mb-6" size={40} />
            <h4 className="text-xl font-bold mb-4">Segurança Total</h4>
            <p className="text-gray-500 text-sm">Transações protegidas e garantia de entrega em todos os produtos.</p>
          </div>
          <div className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <Users className="text-brand-gold mx-auto mb-6" size={40} />
            <h4 className="text-xl font-bold mb-4">Comunidade Forte</h4>
            <p className="text-gray-500 text-sm">Mais de 10.000 pessoas já confiam na nossa marca para crescer.</p>
          </div>
          <div className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <Award className="text-brand-gold mx-auto mb-6" size={40} />
            <h4 className="text-xl font-bold mb-4">Qualidade Premium</h4>
            <p className="text-gray-500 text-sm">Apenas os melhores produtos e recursos digitais do mercado.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
