import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { SAMPLE_BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Calendar, User, Tag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'blogPosts'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as BlogPost);
      setPosts(data.length > 0 ? data : SAMPLE_BLOG_POSTS);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['Todos', 'Dropshipping', 'Marketing Digital', 'Empreendedorismo', 'E-commerce', 'Dicas'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-gray/30">
      {/* Header */}
      <div className="bg-brand-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading 
            title="Blog & Dicas Digitais" 
            subtitle="Aprenda com os melhores"
            centered
          />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Descubra estratégias, tutoriais e tendências do mercado digital para levar o seu negócio ao próximo nível.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar artigos por título ou assunto..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-5 pl-16 pr-8 text-white focus:outline-none focus:border-brand-gold transition-colors backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="section-padding">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="premium-card group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                          <Calendar size={12} /> {post.date}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
                          <User size={14} className="text-brand-gold" /> {post.author}
                        </div>
                        <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-sm font-bold text-brand-black group-hover:gap-4 transition-all">
                          Ler Mais <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum artigo encontrado</h3>
                <p className="text-gray-500">Tente pesquisar por outro termo ou categoria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex flex-col gap-10">
            {/* Categories */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Tag size={18} /> Categorias
              </h4>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-medium px-4 py-3 rounded-2xl text-left transition-all flex items-center justify-between group ${
                      selectedCategory === cat 
                        ? 'bg-brand-black text-white shadow-lg' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                    <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${selectedCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Sidebar */}
            <div className="bg-brand-gold p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <h4 className="text-xl font-bold mb-4">Receba Dicas VIP</h4>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Subscreva para receber os melhores artigos e estratégias diretamente no seu e-mail.
              </p>
              <form className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="bg-white/20 border border-white/30 rounded-full py-3 px-6 text-white placeholder:text-white/50 text-sm focus:outline-none focus:bg-white/30 transition-all"
                  required
                />
                <button type="submit" className="bg-white text-brand-gold py-3 rounded-full font-bold hover:bg-gray-100 transition-all text-sm">
                  Subscrever Agora
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
