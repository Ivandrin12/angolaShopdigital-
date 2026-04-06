import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ChatMessage } from '../types';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { user, profile, isAdmin, signIn } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    // In a real app, we might want to separate chats by userId
    // For this demo, we'll use a single chat collection
    const chatId = isAdmin ? 'admin-support' : user.uid;
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const chatId = isAdmin ? 'admin-support' : user.uid;
    const newMessage = {
      senderId: user.uid,
      senderName: profile?.displayName || user.displayName || 'Usuário',
      text: message,
      timestamp: serverTimestamp(),
      isAdmin: isAdmin
    };

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);
      setMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="bg-white w-[350px] h-[500px] rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-brand-black p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Suporte Online</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Estamos online agora</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50">
              {!user ? (
                <div className="text-center py-10 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm">
                    <User size={32} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h5 className="font-bold text-brand-black">Acesse a sua conta</h5>
                    <p className="text-xs text-gray-500 max-w-[200px] mx-auto">
                      Para falar com o nosso suporte, por favor entre na sua conta ou crie uma nova.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Link 
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="bg-brand-black text-white py-3 rounded-xl text-xs font-bold hover:bg-brand-gold transition-colors flex items-center justify-center"
                    >
                      Entrar na Conta
                    </Link>
                    <Link 
                      to="/registo"
                      onClick={() => setIsOpen(false)}
                      className="text-brand-black text-[10px] font-bold uppercase tracking-widest hover:text-brand-gold transition-colors flex items-center justify-center"
                    >
                      Criar Conta Grátis
                    </Link>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm">
                    <MessageCircle size={32} />
                  </div>
                  <p className="text-sm text-gray-500 max-w-[200px]">
                    Olá {user.displayName}! Como podemos ajudar você hoje? Envie uma mensagem abaixo.
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.senderId === user?.uid ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
                        msg.senderId === user?.uid
                          ? 'bg-brand-black text-white rounded-tr-none'
                          : 'bg-white text-brand-black rounded-tl-none border border-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">
                      {msg.senderName}
                    </span>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={user ? "Digite sua mensagem..." : "Faça login para enviar"}
                disabled={!user}
                className="flex-1 bg-gray-100 border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-brand-gold transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!message.trim() || !user}
                className="w-10 h-10 bg-brand-black text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-gold transition-colors relative group"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            1
          </span>
        )}
        <div className="absolute right-20 bg-white text-brand-black px-4 py-2 rounded-xl shadow-xl border border-gray-100 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Precisa de ajuda?
        </div>
      </motion.button>
    </div>
  );
}
