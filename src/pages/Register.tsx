import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, Lock, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dobDay: '',
    dobMonth: '',
    dobYear: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone,
        {
          day: formData.dobDay,
          month: formData.dobMonth,
          year: formData.dobYear
        }
      );
      navigate('/perfil');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[50px] border border-gray-100 shadow-2xl"
        >
          <div className="text-center mb-10">
            <SectionHeading 
              title="Criar Conta Grátis" 
              subtitle="Junte-se a nós"
              centered
            />
            <p className="text-gray-500 mt-4">
              Preencha os seus dados para começar a sua jornada na AngolaShopDigital.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm mb-8 border border-red-100 flex items-center gap-3">
              <ShieldCheck size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Seu nome completo" 
                  className="w-full bg-brand-gray border-none rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com" 
                  className="w-full bg-brand-gray border-none rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Palavra-passe</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres" 
                  className="w-full bg-brand-gray border-none rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Telemóvel (Angola ou Int.)</label>
              <div className="relative">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+244 9XX XXX XXX" 
                  className="w-full bg-brand-gray border-none rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Data de Nascimento</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <select 
                    name="dobDay"
                    value={formData.dobDay}
                    onChange={handleChange}
                    className="w-full bg-brand-gray border-none rounded-full py-4 pl-10 pr-4 text-xs focus:ring-2 focus:ring-brand-gold transition-all appearance-none"
                    required
                  >
                    <option value="">Dia</option>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <select 
                  name="dobMonth"
                  value={formData.dobMonth}
                  onChange={handleChange}
                  className="w-full bg-brand-gray border-none rounded-full py-4 px-4 text-xs focus:ring-2 focus:ring-brand-gold transition-all appearance-none"
                  required
                >
                  <option value="">Mês</option>
                  {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select 
                  name="dobYear"
                  value={formData.dobYear}
                  onChange={handleChange}
                  className="w-full bg-brand-gray border-none rounded-full py-4 px-4 text-xs focus:ring-2 focus:ring-brand-gold transition-all appearance-none"
                  required
                >
                  <option value="">Ano</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg mt-4 group disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Criar Minha Conta <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Já tem uma conta? <Link to="/login" className="text-brand-gold font-bold hover:underline">Faça login aqui</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
