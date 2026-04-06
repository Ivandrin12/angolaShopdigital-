import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_INFO } from '../constants';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Mensagem enviada com sucesso!');
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'E-mail Profissional',
      value: BRAND_INFO.email,
      link: `mailto:${BRAND_INFO.email}`
    },
    {
      icon: <Phone size={24} />,
      label: 'WhatsApp',
      value: `+244 ${BRAND_INFO.whatsapp}`,
      link: `https://wa.me/244${BRAND_INFO.whatsapp}`
    },
    {
      icon: <Instagram size={24} />,
      label: 'Instagram',
      value: `@${BRAND_INFO.instagram}`,
      link: `https://instagram.com/${BRAND_INFO.instagram}`
    },
    {
      icon: <MapPin size={24} />,
      label: 'Localização',
      value: 'Luanda, Angola',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading 
              title="Entre em Contacto" 
              subtitle="Estamos aqui para ajudar"
            />
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-md">
              Tem alguma dúvida sobre os nossos produtos, serviços ou oportunidades de negócio? 
              A nossa equipa está pronta para responder.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-gold group-hover:text-white transition-colors mb-6">
                    {info.icon}
                  </div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{info.label}</h4>
                  <p className="font-bold text-brand-black group-hover:text-brand-gold transition-colors">{info.value}</p>
                </a>
              ))}
            </div>

            <div className="bg-brand-black p-10 rounded-[40px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-4">Suporte Prioritário</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Para questões urgentes sobre pedidos ou suporte técnico, utilize o nosso chat online disponível 24/7.
              </p>
              <button className="flex items-center gap-2 bg-brand-gold text-white px-8 py-4 rounded-full font-bold hover:bg-brand-gold/90 transition-all">
                <MessageCircle size={20} /> Abrir Chat Agora
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-12 lg:p-16 rounded-[50px] border border-gray-100 shadow-2xl"
          >
            <h3 className="text-3xl font-display font-extrabold text-brand-black mb-10">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Ivandrin Ndala" 
                    className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="Ex: seuemail@gmail.com" 
                    className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Assunto</label>
                <select className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all appearance-none">
                  <option>Dúvida sobre Produto</option>
                  <option>Suporte Técnico</option>
                  <option>Parcerias / Dropshipping</option>
                  <option>Outros Assuntos</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Mensagem</label>
                <textarea 
                  rows={5}
                  placeholder="Como podemos ajudar?" 
                  className="bg-brand-gray border-none rounded-3xl py-6 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg mt-4 group">
                Enviar Mensagem <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
