import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/perfil');
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar. Verifique os seus dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
      navigate('/perfil');
    } catch (err) {
      console.error(err);
    }
  };

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
              title="Bem-vindo de Volta" 
              subtitle="Acesse a sua conta"
              centered
            />
            <p className="text-gray-500 mt-4">
              Faça login para gerir os seus pedidos e downloads.
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
                  placeholder="Sua palavra-passe" 
                  className="w-full bg-brand-gray border-none rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                  required
                />
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
                <>Entrar na Conta <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="bg-white px-4 text-gray-400">Ou continue com</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border-2 border-gray-100 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Entrar com Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-8">
              Não tem uma conta? <Link to="/registo" className="text-brand-gold font-bold hover:underline">Crie uma grátis</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
